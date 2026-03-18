// lib/getSlideInfo.js

export async function getSlideInfo() {
    try {
        // ডাইনামিক URL: লোকাল পিসি নাকি লাইভ সার্ভার, সেটি নিজে থেকেই চেক করবে
        const baseUrl = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000' // 💻 আপনার লোকাল পিসির জন্য 
            : process.env.NEXT_PUBLIC_API_URL; // 🌐 লাইভ সার্ভারের (VPS) জন্য

        const res = await fetch(`${baseUrl}/api/slide`, {
           next: { tags: ['slides'] } 
        });

        if (!res.ok) {
            throw new Error('Failed to fetch slides');
        }

        const data = await res.json();
        return data.slides || [];
    } catch (error) {
        console.error('Error fetching slides:', error);
        return [];
    }
}