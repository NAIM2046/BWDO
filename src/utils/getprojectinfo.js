export default  async function getprojectinfo() {
     try {
        const res = await fetch(`http://127.0.0.1:8083/api/project`, {
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
};


