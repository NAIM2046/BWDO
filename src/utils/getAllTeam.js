export default async function getAllTeam() {
    try {
        // ডাইনামিক URL: লোকাল পিসি নাকি লাইভ সার্ভার, সেটি নিজে থেকেই চেক করবে
        const baseUrl = process.env.NODE_ENV === 'development' 
            ? 'http://localhost:3000' // 💻 আপনার লোকাল পিসির জন্য 
            : 'http://127.0.0.1:8083'; // 🌐 লাইভ সার্ভারের (VPS) জন্য

        const res = await fetch(`${baseUrl}/api/team`, {
            next: [{tags: ['team']}]
        });

        if (!res.ok) {
            throw new Error('Failed to fetch team');
        }

        const data = await res.json();
        //console.log(data);
        return data.team || [];
    } catch (error) {
        console.error('Error fetching team:', error);
        return [];
    }
}