export default async function getprojectinfo() {
    try {
        // ডাইনামিক URL: লোকাল পিসি নাকি লাইভ সার্ভার, সেটি নিজে থেকেই চেক করবে
        const baseUrl = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000' // 💻 আপনার লোকাল পিসির জন্য 
            : process.env.NEXT_PUBLIC_API_URL; // 🌐 লাইভ সার্ভারের (VPS) জন্য

        const res = await fetch(`${baseUrl}/api/project`, {
            next: { revalidate: 3600 } // 1 hour cache
        });

        if (!res.ok) {
            throw new Error('Failed to fetch project info');
        }

        const data = await res.json();
        //console.log(data);
        return data || [];
    } catch (error) {
        console.error('Error fetching project info:', error);
        return [];
    }
}