const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 

module.exports.handlePayment = async (req, res) => {
  const product = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: 
        product.map((curr) => {
            return {
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:curr.name
                    },
                    unit_amount:curr.price * 100,
                },
                quantity:curr.amount
            }
        }),
    //   {
    //     price_data: {
    //       currency: "inr",
    //       product_data: {
    //         name: product.name,
    //       },
    //       unit_amount: product.price * 100,
    //     },
    //     quantity: product.quantity,
    //   },
    mode: "payment",
    success_url: "http://127.0.0.1:5173/success",
    cancel_url: "http://127.0.0.1:5173/cancel",
  });
  res.json({ id: session.id });
};
