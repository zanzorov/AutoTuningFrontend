import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   addUser,
   errorNull,
   showModalSignUp,
} from "../../../features/users/usersSlice";
import { Form, Modal, Button, Spinner } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SignUpPage = () => {
   const [login, setLogin] = useState("");
   const [password, setPassword] = useState("");
   const [email, setEmail] = useState("");

   const [showPassword, setShowPassword] = useState(false);

   const dispatch = useDispatch();

   const signUp = useSelector((state) => state.usersReducer.signUp);
   const showSignUp = useSelector((state) => state.usersReducer.showSignUp);
   const error = useSelector((state) => state.usersReducer.error);

   const handleChangeLogin = (e) => setLogin(e.target.value);
   const handleChangePassword = (e) => setPassword(e.target.value);
   const handleChangeEmail = (e) => setEmail(e.target.value);

   const handleSubmit = () => {
      dispatch(addUser({ login, password }));
      setLogin("");
      setPassword("");
   };

   const handleChecked = (e) => {
      if (e.target.checked) {
         setShowPassword(true);
      } else {
         setShowPassword(false);
      }
   };

   const handleClose = () => {
      dispatch(showModalSignUp(false));
      dispatch(errorNull());
   };

   const handleOpenEye = () => {
      setShowPassword(false);
   };
   const handleClouseEye = () => {
      setShowPassword(true);
   };

   const colorTextError = error ? "red" : "white";

   return (
      <>
         <Modal
            show={showSignUp}
            onHide={handleClose}
            keyboard={true}
            backdrop="static"
         >
            <Modal.Header>
               <Modal.Title style={{ paddingLeft: "25%" }}>РЕГИСТРАЦИЯ</Modal.Title>
               <Button
                  onClick={handleClose}
                  style={{ color: "white", background: "black", border: "none", fontSize: "28px", }}
               >
                  &times;
               </Button>
            </Modal.Header>

            <Modal.Body>
               <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Label>Email </Form.Label>
                     <Form.Control
                        type="email"
                        placeholder="Введите email"
                        onChange={handleChangeEmail}
                        value={email}
                     />
                     <span style={{ color: colorTextError, fontSize: 14 }}>
                        {" "}
                        {error}
                     </span>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicLogin">
                     <Form.Label>Логин </Form.Label>
                     <Form.Control
                        type="login"
                        placeholder="Введите логин"
                        onChange={handleChangeLogin}
                        value={login}
                     />
                     <span style={{ color: colorTextError, fontSize: 14 }}>
                        {" "}
                        {error === "логин уже занят"
                           ? "(логин уже занят)"
                           : "(обязательное поле)"}
                     </span>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                     <Form.Label>Пароль </Form.Label>
                     <Form.Control
                        type={showPassword ? "Text" : "Password"}
                        placeholder="Введите пароль"
                        onChange={handleChangePassword}
                        value={password}
                     />
                     {showPassword ? (
                        <div onClick={handleOpenEye}>
                           <AiOutlineEye
                              onClick={handleChecked}
                              style={{
                                 position: "absolute",
                                 bottom: "115",
                                 color: "black",
                                 cursor: "pointer",
                                 left: "445",
                                 fontSize: "25px",
                              }}
                           />
                        </div>
                     ) : (
                        <div onClick={handleClouseEye}>
                           <AiOutlineEyeInvisible
                              style={{
                                 position: "absolute",
                                 bottom: "115",
                                 color: "black",
                                 cursor: "pointer",
                                 left: "445",
                                 fontSize: "25px",
                              }}
                           />
                        </div>
                     )}

                     <span style={{ color: colorTextError, fontSize: 14 }}>
                        {" "}
                        (больше 4 и меньше 10 символов){" "}
                     </span>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                     <span style={{ color: colorTextError, fontSize: 16 }}>
                        {error !== "логин уже занят" && error}{" "}
                     </span>
                  </Form.Group>

                  <Button
                     variant="primary"
                     type="button"
                     className="mt-3"
                     disabled={!login || password.length < 3}
                     onClick={handleSubmit}
                  >
                     {signUp ? (
                        <div>
                           <Spinner size={14} />
                        </div>
                     ) : (
                        "Регистрация"
                     )}
                  </Button>
               </Form>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default SignUpPage;
