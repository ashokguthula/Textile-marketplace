import dns from "dns/promises";
import { Resolver } from "dns";

const resolver = new Resolver();

resolver.setServers(["8.8.8.8", "8.8.4.4"]);

resolver.resolveSrv(
  "_mongodb._tcp.cluster0.i9i0vpb.mongodb.net",
  (err, addresses) => {
    if (err) {
      console.error(err);
    } else {
      console.log(addresses);
    }
  }
);