export default async function getAllblogInfo() {
    try {
        // ডাইনামিক URL: লোকাল পিসি নাকি লাইভ সার্ভার, সেটা নিজে থেকেই চেক করবে
        const baseUrl = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000' // 💻 আপনার লোকাল পিসির জন্য (পোর্ট অন্য হলে পাল্টে দেবেন)
            : 'http://127.0.0.1:8083'; // 🌐 লাইভ সার্ভারের (VPS) জন্য

        const res = await fetch(`${baseUrl}/api/blogs`, {
            next: { revalidate: 3600 } // 1 hour cache
        });

        if (!res.ok) {
            throw new Error('Failed to fetch blogs');
        }

        const data = await res.json();
        return data.blogs || [];
    } catch (error) {
        // এখানে স্লাইডের জায়গায় ব্লগ লিখে দিলাম
        console.error('Error fetching blogs:', error); 
        return [];
    }
}