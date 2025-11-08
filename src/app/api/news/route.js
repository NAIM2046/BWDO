import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";

import News from "../../../../lib/model/news";

export const GET = async (req) => {

 try{
    await connectDB() ; 
    const newsList = await News.find().sort({ createdAt: -1 });
    return NextResponse.json(newsList);

 }catch(error){
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
 }

}

export const POST = async (req) => { {
  try {
    const body = await req.json();
    await connectDB();
    const newNews = News.create(body) ; 
    return NextResponse.json(newNews, { status: 201 });

    
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}};

