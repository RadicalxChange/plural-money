import { ZuAuthArgs } from "@pcd/zuauth";

/**
 * ZuAuth configuration.
 * Can be found in Podbox in the "ZuAuth Configuration" section of your
 * pipeline dashboard.
 */
export const config: ZuAuthArgs["config"] = [
  {
    pcdType: "eddsa-ticket-pcd",
    publicKey: [
      "1ebfb986fbac5113f8e2c72286fe9362f8e7d211dbc68227a468d7b919e75003",
      "10ec38f11baacad5535525bbe8e343074a483c051aa1616266f3b1df3fb7d204"
    ],
    eventId: "21c7db2e-08e3-4234-9a6e-386a592d63c8",
    eventName: "Edge Esmeralda",
  }
];