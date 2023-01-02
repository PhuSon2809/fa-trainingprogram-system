import React, { useState } from "react";
import LayoutAuthen from "./LayoutAuthen/LayoutAuthen";
import Login from "./Login/Login";

function Authenticated() {
  const [reload, setReload] = useState(false);

  return (
    <LayoutAuthen>
      <Login reload={() => setReload(!reload)} />
    </LayoutAuthen>
  );
}

export default Authenticated;
