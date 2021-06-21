import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {!cartItems.length ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map(
              ({ product, name, image, price, qty, countInStock }) => (
                <ListGroup.Item key={product}>
                  <Row>
                    <Col md={2}>
                      <Image src={image} alt={name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${product}`}>{name}</Link>
                    </Col>
                    <Col md={2}>${price}</Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) =>
                          dispatch(addToCart(product, Number(e.target.value)))
                        }
                      >
                        {[...Array(countInStock).keys()].map((val) => (
                          <option key={val + 1} value={val + 1}>
                            {val + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(product)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            )}
          </ListGroup>
        )}
      </Col>
      <Col col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (accumulator, currentValue) => accumulator + currentValue.qty,
                  0
                )}
                ) items
              </h2>
              $
              {cartItems
                .reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.qty * currentValue.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block w-100"
                disabled={!cartItems.length}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
