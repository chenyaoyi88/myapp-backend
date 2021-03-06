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
            let pageSize = 10;
            let pageNo = 0;

            for (let pro in oParams) {
                if (/pageSize/i.test(pro)) {
                    pageSize = Number(oParams[pro]) || 10;
                } else if (/pageNo/i.test(pro)) {
                    pageNo = oParams[pro];
                } else {
                    if (/\S/.test(oParams[pro])) {
                        params[pro] = new RegExp(oParams[pro]);
                    }
                }
            }

            page.pageSize = pageSize;
            page.pageNo = pageNo < 1 ? 0 : (pageNo - 1) * pageSize;

            return {
                params,
                page
            };
        }
    },
    /**
     * @description 获取详细时间
     * @returns {String} 例如：201710181111111
     */
    getTime: function () {
        const oDate = new Date();
        const sTime = 
            oDate.getFullYear().toString() + 'y' +
            (oDate.getMonth() + 1) + 'm' +
            oDate.getDate().toString() + 'd' +
            oDate.getHours().toString() + 'h' +
            oDate.getMinutes().toString() + 'min' +
            oDate.getSeconds().toString() + 'sec' +
            oDate.getMilliseconds().toString();
        return sTime;
    }
};

module.exports = commonMethod;