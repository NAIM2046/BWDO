export default  async function getAllblogInfo() {
     try {
        const res = await fetch(`http://127.0.0.1:8083/api/blogs`, {
            next: { revalidate: 3600 } // 1 hour cache
        });

        if (!res.ok) {
            throw new Error('Failed to fetch blogs');
        }

         const data = await res.json();
         //console.log(data);
        return data.blogs || [];
    } catch (error) {
        console.error('Error fetching slides:', error);
        return [];
    }
};


