export default  async function getAllphoto() {
     try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/images`, {
            next: { revalidate: 3600 } // 1 hour cache
        });

        if (!res.ok) {
            throw new Error('Failed to fetch slides');
        }

         const data = await res.json();
         //console.log(data);
        return data || [];
    } catch (error) {
        console.error('Error fetching slides:', error);
        return [];
    }
};


