export default  async function getAllblogInfo() {
     try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`, {
            next: { revalidate: 3600 } // 1 hour cache
        });

        if (!res.ok) {
            throw new Error('Failed to fetch slides');
        }

         const data = await res.json();
         //console.log(data);
        return data.blogs || [];
    } catch (error) {
        console.error('Error fetching slides:', error);
        return [];
    }
};


