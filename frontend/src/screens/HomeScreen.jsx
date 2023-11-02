import { Row,Col } from "react-bootstrap"
import Product from "../components/Products";
import { useGetProductsQuery } from "../slices/productsApi";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
    const { data: products , isLoading , error } = useGetProductsQuery();
    console.log(useGetProductsQuery());

    return (
        <>
            {isLoading ? (<Loader />) : error ? (<Message variant = 'danger'>{error?.data?.message || error.error }</Message>) : (<><h1>Latest Products</h1>
            <Row>
                {products.map((product)=> (
                    <Col key={product._id} sm={12} md={12} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            </>) }
            
        </>
    );
};

export default HomeScreen;
