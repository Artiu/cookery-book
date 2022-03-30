import withAuth from "features/auth/HOC/withAuth";
import AddRecipeForm from "features/recipe/add/ui/Form";
import Head from "next/head";

function AddRecipePage() {
    return (
        <>
            <Head>
                <title>Dodaj przepis</title>
            </Head>
            <AddRecipeForm />
        </>
    );
}
export default withAuth(AddRecipePage);
