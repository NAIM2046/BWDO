export default  async function getAllTeam() {
     try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team`, {
            next: { revalidate: 3600 } // 1 hour cache
        });

        if (!res.ok) {
            throw new Error('Failed to fetch slides');
        }

         const data = await res.json();
         //console.log(data);
        return data.team || [];
    } catch (error) {
        console.error('Error fetching slides:', error);
        return [];
    }
};


