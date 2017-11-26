const commonMethod = {
    /**
     * @description 将对象参数分割成 page 和 查询参数 两个对象
     * @param oParams 客户端提交过来的对象参数
     * @returns page 和 params 两个参数
     */
    queryParamsSplit: function (oParams) {
        if (!(oParams.constructor === Object)) {
            return {
                params: {},
                page: {
                    pageNo: 1,
                    pageSize: 10
                }
            };
        } else {
            let params = {};
            let page = {};

            for (let pro in oParams) {
                if (/pageSize/i.test(pro)) {
                    page.pageSize = oParams[pro];
                } else if (/pageNo/i.test(pro)) {
                    page.pageNo = oParams[pro];
                } else {
                    if (/\S/.test(oParams[pro])) {
                        params[pro] = new RegExp(oParams[pro]);
                    }
                }
            }

            return {
                params,
                page
            };
        }
    }
};

module.exports = commonMethod;