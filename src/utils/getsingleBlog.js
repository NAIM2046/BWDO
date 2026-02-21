export default async function getsingleBlog(id) {
        try {
        const res = await fetch(`http://127.0.0.1:8083/api/blogs/${id}`, {
            next: { revalidate: 3600 } 
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
};
