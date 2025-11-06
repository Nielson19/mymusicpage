function LoginPageView() {
  return (
    <div className="login-page">
      <ButtonComponent
        size="large"
        label="Login"
        onClick={() => console.log("Login button clicked!")}
      />
    </div>
  );
}

export default LoginPageView;
