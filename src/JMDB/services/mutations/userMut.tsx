import {gql} from '@apollo/client';
import { useCreateUserMutation } from "@/generated/graphql";

const CreateUserForm = () => {
    const [createUser, { data, loading, error }] = useCreateUserMutation();

    const handleClick = () => {
        createUser({
            variables: {
                input: {
                    username: "mumtaz_test",
                    email: "mumtaz@example.com",
                    pass: "123456"
                }
            }
        });
    };

    return (
        <div>
            <button onClick={handleClick}>Create User</button>
    {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
            {data?.createUser && (
                <p>User created: {data.createUser.username} ({data.createUser.email})</p>
            )}
            </div>
        );
        };

        export default CreateUserForm;





