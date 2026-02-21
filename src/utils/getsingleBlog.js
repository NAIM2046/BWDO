export default async function getsingleBlog(id) {
    try {
        // ডাইনামিক URL: লোকাল পিসি নাকি লাইভ সার্ভার, সেটি নিজে থেকেই চেক করবে
        const baseUrl = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000' // 💻 আপনার লোকাল পিসির জন্য 
            : 'http://127.0.0.1:8083'; // 🌐 লাইভ সার্ভারের (VPS) জন্য

        const res = await fetch(`${baseUrl}/api/blogs/${id}`, {
            next: { tags: [`blog-${id}`] } // এই ট্যাগ দিয়ে ব্লগের ক্যাশ ম্যানেজ করা হবে
        });

        if (!res.ok) {
            throw new Error('Failed to fetch blog');
        }

        const data = await res.json();
        //console.log(data);
        return data || [];
    } catch (error) {
        console.error('Error fetching blog:', error);
        return [];
    }
}