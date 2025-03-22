export async function cadastrarToken(userId, token) {
    try {

        const response = await fetch(`http://localhost:3000/contas/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token: token })
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar token: ${response.statusText}`);
        }

        const updatedUser = await response.json();
        console.log("Usuário atualizado:", updatedUser);
        return updatedUser;
    } catch (error) {
        console.error("Erro ao cadastrar token:", error);
        return null;
    }
}
