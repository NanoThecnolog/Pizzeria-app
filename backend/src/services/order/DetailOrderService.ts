import prismaClient from "../../prisma";

interface DetailRequest{
    order_id: string;
}

class DetailOrderService{
    async execute({order_id}: DetailRequest){
        const orders = await prismaClient.item.findMany({
            where:{
                order_id: order_id
            },
            //incluir informações de cada item dentro do pedido/ordem
            include:{
                product: true,
                order: true

            }
        })

        return orders;


    }

}
export {DetailOrderService};