

/**
 * 获取并解析URL查询参数
 *
 * 该函数从当前页面的URL中获取查询参数部分，并将其解析为一个键值对对象
 * 如果URL中没有查询参数，则返回一个空对象
 *
 * @returns {object} 包含查询参数的键值对对象
 */
export function getUrlParams(): { [key: string]: any } {
  // 获取当前页面URL
  const url = window.location.href;
  // 通过包含问号来判断URL是否包含查询参数，并获取查询参数部分
  const query = url.includes('?') ? url.split('?')[1] : ''; // 优化处理没有查询参数的情况

  // 如果没有查询参数，直接返回空对象
  if (!query) {
    return {};
  }

  // 将查询参数字符串解析为键值对数组
  const paramsArray = query.split('&');

  // 使用reduce函数将键值对数组转换为对象
  return paramsArray.reduce((pre: { [key: string]: any }, item) => {
    // 使用正则表达式提前验证参数格式是否正确（包含"="）
    if (!item.includes('=')) {
      console.warn(`Skipping invalid parameter: ${item}`);
      return pre; // 格式不正确，跳过当前项
    }
    // 将键值对字符串分割为键和值
    const [key, value] = item.split('=');
    // 对参数值进行简单的编码（或称为转义），防止XSS攻击
    // 注意：这里使用了一种简单的替换方案，实际应用中可能需要更严格的编码方案
    pre[key] = value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return pre;
  }, {});
}

/**
 * 在生产模式下禁止控制台的使用，并检测调试行为
 *
 * 为了提高用户体验并保护生产环境的稳定性，此函数会在生产模式下
 * 检测是否有人试图通过调试模式查看或修改网页内容如果检测到调试行为，
 * 将会弹出一个提示信息，并且尝试阻止这些调试行为
 */
export function banConsole(): void {
  const urlParams = getUrlParams();
  if (import.meta.env.MODE === 'production' && urlParams.debug !== 'true') {
    // if (
    //   window.outerHeight  > 200 ||
    //   window.outerWidth  > 200
    // ) {
    //   document.body.innerHTML =
    //     '请不要随便查看别人代码';
    // }
    setInterval(() => {
      (function () {
        return false;
      })
        [
          // eslint-disable-next-line no-unexpected-multiline
          'constructor'
        ]('debugger')
        [
          // eslint-disable-next-line no-unexpected-multiline
          'call'
        ]();
    }, 50);
  }
}
