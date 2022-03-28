export async function revalidate(path) {
    await fetch("/api/revalidate", {
        method: "POST",
        body: JSON.stringify({ path }),
    });
}
