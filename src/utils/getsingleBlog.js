export default async function getsingleBlog(id) {
        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${id}`, {
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
