<template>
  <div>
    <van-row>
      <van-col span="24">
        <van-tabs  @click="onClick" title-active-color="#E32DAB"  :line-width="100" :line-height="2">
          <van-tab v-for="index in categories.length" :title="categories[index-1].name" class="tab">
            <van-card v-for="(item,index) in phones"
                      :price="item.price"
                      :desc="item.desc"
                      :title="item.title"
                      :thumb="item.thumb"
            >
              <template #tags>
                <van-tag v-for="tag in item.tag" color="#f2826a" style="margin-left: 5px;">{{tag.name}}</van-tag>
              </template>
              <template #footer>
                <van-button round type="info" size="mini" @click="buy(index)">购买</van-button>
              </template>
            </van-card>
          </van-tab>
        </van-tabs>
      </van-col>
    </van-row>

    <van-sku
            v-model="show"
            :sku="sku"
            :goods="goods"
            :hide-stock="sku.hide_stock"
            @buy-clicked="onBuyClicked"
    >
      <template #sku-actions="props">
        <div class="van-sku-actions">

          <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
          <van-button
                  square
                  size="large"
                  type="danger"
                  @click="props.skuEventBus.$emit('sku:buy')"
          >
            买买买
          </van-button>
        </div>
      </template>
    </van-sku>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        categories:'',
        phones:'',
        show:false,
        sku: {},
        goods: {}
      };
    },
    created() {
      const  _this = this;
      axios.get('http://localhost:8181/phone/index').then(function (resp) {
        // console.log(resp)
        _this.categories = resp.data.data.categories
        _this.phones = resp.data.data.phones
      })
    },
    methods:{
      buy(index) {
        // alert(this.phones[index].id)
        this.show = true
        const _this = this
        axios.get('http://localhost:8181/phone/findSpecsByPhoneId/' + this.phones[index].id).then(function (resp) {
          _this.sku = resp.data.data.sku
          _this.goods = resp.data.data.goods
        })
      },
        /*this.sku = {
          // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
          // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
          tree: [
            {
              k: '规格', // skuKeyName：规格类目名称
              v: [
                {
                  id: '1', // skuValueId：规格值 id
                  name: '32GB', // skuValueName：规格值名称
                  imgUrl: '../static/e84a2e03-7f19-41d2-98a5-a5c16b7e252d.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                  previewImgUrl: '../static/e84a2e03-7f19-41d2-98a5-a5c16b7e252d.jpg', // 用于预览显示的规格类目图片
                },
                {
                  id: '2',
                  name: '64GB',
                  imgUrl: '../static/8f0bd0d0-a11e-4185-927e-04b54ff4a1bd.jpg',
                  previewImgUrl: '../static/8f0bd0d0-a11e-4185-927e-04b54ff4a1bd.jpg',
                }
              ],
              k_s: 's1'// skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            }
          ],
          // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
          list: [
            {
              id: 1, // skuId，下单时后端需要
              price: '280000.00', // 价格（单位分）
              s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
              stock_num: 110 // 当前 sku 组合对应的库存
            },
            {
              id: 2, // skuId，下单时后端需要
              price: '320000.00', // 价格（单位分）
              s1: '2', // 规格类目 k_s 为 s2 的对应规格值 id
              stock_num: 117 // 当前 sku 组合对应的库存
            }
          ],
          price: '2800.00', // 默认价格（单位元）
          stock_num: 227, // 商品总库存
          collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
          messages: [
            {
              // 商品留言
              datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
              multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
              name: '留言', // 留言名称
              type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
              required: '1', // 是否必填 '1' 表示必填
              placeholder: '' // 可选值，占位文本
            }
          ],
          hide_stock: false // 是否隐藏剩余库存
        }
      },*/
      onBuyClicked(item){
        this.$store.state.specsId = item.selectedSkuComb.s1
        this.$store.state.quantity = item.selectedNum
        this.$router.push('/addressList')
      },
      onClick(index){
        // alert(index) 前端的下标
        // alert(this.categories[index].type);
        const _this = this
        axios.get('http://localhost:8181/phone/findByCategoryType/'+this.categories[index].type).then(function (resp) {
          _this.phones = resp.data.data
        })
      }
    }
  };
</script>