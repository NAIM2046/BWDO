export default  async function getAllTeam() {
     try {
        const res = await fetch(`http://127.0.0.1:8083/api/team`, {
            next: { revalidate: 3600 } // 1 hour cache
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
};


