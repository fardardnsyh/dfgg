import { ObjectId } from 'mongodb'; // Import ObjectId from mongodb package
import { getUser } from '@/prisma/actions/users';
import { CoreMessage } from 'ai';
import OpenAI from 'openai';

import { authorizePrompt } from '@/prisma/actions/prompt';
import { pc } from "@/lib/pinecone";
import prisma from '@/prisma/prisma/db';
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { NextResponse } from 'next/server';

const openai = new OpenAI();

export async function POST(req: Request) {
    const { messages } = await req.json() as { messages: CoreMessage[] };

    const headers = new Headers(req.headers);

    // Example ObjectId for demonstration; in practice, use a valid ObjectId.
    const fileId = new ObjectId("66b79ca340ce92efc1a7402d"); // Use ObjectId here

    if (!fileId)
        return NextResponse.json("Bad request", { status: 400 });

    const user = await getUser();

    if (!user)
        return NextResponse.json("Unauthorized user", { status: 401 });

    const userId = "fakeId"; // Consider dynamic user IDs for production

    const authorize = await authorizePrompt(userId);

    if (!authorize)
        return NextResponse.json("Bad request", { status: 400, headers: { message: "Try again tomorrow, you're making me broke my friend :(" } });

    const currentMessage = messages.pop();

    if (!currentMessage)
        return NextResponse.json("Invalid message", { status: 400 });

    await prisma.message.create({
        data: {
            text: currentMessage.content as string,
            isUserMessage: currentMessage.role === 'user' ? true : false,
            userId: userId,
            fileId: fileId.toHexString() // Store as string if Prisma expects string
        },
    });

    const embeddings = new OpenAIEmbeddings();

    const pineconeIndex = pc.index(process.env.PINECONE_INDEX!);

    // vectorize incoming user message
    const vectorStore = await PineconeStore.fromExistingIndex(
        embeddings,
        {
            pineconeIndex: pineconeIndex,
            namespace: fileId.toHexString() // Ensure namespace is in string format
        }
    );

    const similarityResults = await vectorStore.similaritySearch(currentMessage.content as string, 5); // we want 4 pages closest context  

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [
                {
                    role: 'system',
                    content:
                        'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
                },
                {
                    role: 'user',
                    content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
            
            \n----------------\n
            
            PREVIOUS CONVERSATION:
            ${messages.map((message) => {
                        if (message.role === 'user')
                            return `User: ${message.content}\n`
                        return `Assistant: ${message.content}\n`
                    })}
            
            \n----------------\n
            
            CONTEXT:
            ${similarityResults.map((r) => r.pageContent).join('\n\n')}
            
            USER INPUT: ${currentMessage.content}`
                }
            ]
        })
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
        async start(controller) {
            while (true) {
                const { done, value } = await reader!.read();
                if (done) {
                    break;
                }
                const text = decoder.decode(value, { stream: true });
                controller.enqueue(text);

                // Optionally handle each token or message here
                await prisma.message.create({
                    data: {
                        text,
                        isUserMessage: false,
                        userId: userId,
                        fileId: fileId.toHexString() // Store as string if Prisma expects string
                    },
                });
            }
            controller.close();
            reader!.releaseLock();
        }
    });

    return new Response(stream, {
        headers: { 'Content-Type': 'text/event-stream' }
    });
}

export const maxDuration = 30;
