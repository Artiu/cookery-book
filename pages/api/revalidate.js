const handler = async (req, res) => {
	try {
		await res.revalidate(JSON.parse(req.body).path);
		res.json({ revalidated: true });
	} catch (err) {
		console.error(err);
		res.json({ revalidated: false });
	}
};
export default handler;
