export default async function getnewsinfo() {
    try {
        // ডাইনামিক URL: লোকাল পিসি নাকি লাইভ সার্ভার, সেটি নিজে থেকেই চেক করবে
        const baseUrl = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000' // 💻 আপনার লোকাল পিসির জন্য 
            : 'http://127.0.0.1:8083'; // 🌐 লাইভ সার্ভারের (VPS) জন্য

        const res = await fetch(`${baseUrl}/api/news`, {
            next: { revalidate: 3600 } // 1 hour cache
        });

        if (!res.ok) {
            throw new Error('Failed to fetch news');
        }

        const data = await res.json();
        //console.log(data);
        return data || [];
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}