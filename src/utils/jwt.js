export const getUserRole = (token) => {

    if(!token)
        return null;


    try{

        const parts = token.split(".");


        if(parts.length !== 3)
            return null;


        const payload = JSON.parse(
            atob(parts[1])
        );


        return payload[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];


    }
    catch(error){

        console.error("JWT ERROR:",error);

        return null;

    }

};