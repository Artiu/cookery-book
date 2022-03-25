export const handler = async (req, res) => {
    try {
        await res.unstable_revalidate(req.body.path);
        res.json({ revalidated: true });
    } catch {
        res.json({ revalidated: false });
    }
};
