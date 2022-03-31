import withAuth from "features/auth/HOC/withAuth";
import AddRecipeForm from "features/recipe/ui/AddForm";
import Head from "next/head";
import EnterPageAnimation from "shared/ui/EnterPageAnimation";

function AddRecipePage() {
    return (
        <>
            <Head>
                <title>Dodaj przepis</title>
            </Head>
            <EnterPageAnimation>
                <AddRecipeForm />
            </EnterPageAnimation>
        </>
    );
}
export default withAuth(AddRecipePage);
