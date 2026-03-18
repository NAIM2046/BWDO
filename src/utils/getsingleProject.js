export default async function getsingleProject(id) {
    try {
        // ডাইনামিক URL: লোকাল পিসি নাকি লাইভ সার্ভার, সেটি নিজে থেকেই চেক করবে
        const baseUrl = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000' // 💻 আপনার লোকাল পিসির জন্য 
            : process.env.NEXT_PUBLIC_API_URL; // 🌐 লাইভ সার্ভারের (VPS) জন্য

        const res = await fetch(`${baseUrl}/api/project/${id}`, {
            next: { revalidate: 3600 } // 1 hour cache
        });

        if (!res.ok) {
            throw new Error('Failed to fetch project');
        }

        const data = await res.json();
        //console.log(data);
        return data || [];
    } catch (error) {
        console.error('Error fetching project:', error);
        return [];
    }
}