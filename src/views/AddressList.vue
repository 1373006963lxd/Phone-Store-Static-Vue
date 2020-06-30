<template>
    <div>
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                :disabled-list="disabledList"
                disabled-text="以下地址超出配送范围"
                default-tag-text="默认"
                @add="onAdd"
                @edit="onEdit"
                @select="onselect"
        />
    </div>
</template>

<script>
    import { Toast } from 'vant';
    export default {
        data() {
            return {
                chosenAddressId: 0,
                list: [],
                /*[
                    {
                        id: '1',
                        name: '张三',
                        tel: '13012606251',
                        address: '北京市东城区文三路 138 号东方通信大厦 7 楼 501 室',
                        isDefault: true,
                    },
                    {
                        id: '2',
                        name: '李四',
                        tel: '13012606251',
                        address: '浙江省杭州市拱墅区莫干山路 50 号',
                    },
                ],*/
                disabledList: [
                    {
                        id: '3',
                        name: '王五',
                        tel: '1320000000',
                        address: '浙江省杭州市滨江区江南大道 15 号',
                    },
                ],
            };
        },
        created(){
            const _this = this
            axios.get('http://localhost:8181/address/list').then(function (resp) {
                _this.list = resp.data.data
            })
        },
        methods: {
            onAdd() {
                this.$router.push('/addressNew')
            },
            onEdit(item) {
                // console.log(item)
                let data = JSON.stringify(item)
                // console.log(data)字符串
                this.$router.push({path:'/addressEdit',query:{item:data}})
            },
            onselect(item){
                // console.log(item)
                let orderForm = {
                    name: item.name,
                    tel: item.tel,
                    address: item.address,
                    specsId: this.$store.state.specsId,
                    quantity: this.$store.state.quantity
                }
                const _this = this
                axios.post('http://localhost:8181/order/create',orderForm).then(function (resp) {
                    if(resp.data.code == 0){
                        let instance = Toast('下单成功');
                        setTimeout(() => {
                            instance.close();
                            _this.$router.push('/detail?orderId='+resp.data.data.orderId)
                        }, 1000)
                    }
                })
            }
        }
    }
</script>