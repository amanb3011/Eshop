import { useGetUsersQuery,useDeleteUserMutation } from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import Message from '../../components/Message';
import { FaEdit , FaTrash ,FaTimes ,FaCheck } from 'react-icons/fa';
import {  Button , Table , Row , Col } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import Meta from "../../components/Meta";

const UserListScreen = () => {

    const {data:users , isLoading , error, refetch} = useGetUsersQuery();

    // const [createProduct , {isLoading: loadingCreate}] = useCreateProductMutation();

    const [deleteUser , {isLoading: loadingDelete}] = useDeleteUserMutation();

    const deleteHandler = async(id) => {
      if(window.confirm('are you sure?'))
        {
          try {
            await deleteUser(id);
            toast.success('user deleted');
            refetch();
          } catch (err) {
            toast.error(err?.data?.message || err?.error);
          }
        }
    }
    return (
        <>
        <Meta title = 'list of users' />
        <Row className="align-items-center">
            <Col>
               <h1>Users</h1>
            </Col>
        </Row>
        {loadingDelete && <Loader />}
        {isLoading ? (<Loader />) : error ? (<Message variant = 'danger'> {error?.data?.message || error.error}</Message>):(
            <>
            <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                    ) : (
                    <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
            </>
        )}
    </>
    )
}

export default UserListScreen;
