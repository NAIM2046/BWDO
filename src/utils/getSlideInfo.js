// lib/getSlideInfo.js

export async function getSlideInfo() {
    try {
        const res = await fetch(`http://127.0.0.1:8083/api/slide`, {
            next: { revalidate: 3600 } // 1 hour cache
        });

        if (!res.ok) {
            throw new Error('Failed to fetch slides');
        }

        const data = await res.json();
        return data.slides || [];
    } catch (error) {
        console.error('Error fetching slides:', error);
        return [];
    }
}
