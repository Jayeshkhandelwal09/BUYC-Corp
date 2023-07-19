import React from "react";
import { Button, Form, Input } from "antd";
import Divider from "../../components/Divider";
import { Link } from "react-router-dom";

const rules = [
  {
    required: true,
    message: "Required",
  },
];
const Login = () => {
  
  const handleSubmit = (values) => {
    console.log("Sucess", values);
  };
  return (

    // Here we are Implementing the form validation for login

    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <div>
          <h1>
            BuyCars <span className="text-gray-500">Login</span>
          </h1>
        </div>
        {/* the Divider is a component which has been created by me so that we can use the advantage of react usability 
        this basically helps dividing with a horizontal line */}
        <Divider />
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block className="mt-2">
            Login
          </Button>

          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary">
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
