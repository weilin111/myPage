---
layout: post
title: 设计模式
date: 2021-7-17 00:00:00 +0800
category: ~~~~~~
thumbnail: style/image/postLogo/图片8.png
icon: book
cate: CS
---




* content
{:toc}

​    
<p>《<a title="设计范例" class="mw-redirect" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E8%AE%BE%E8%AE%A1%E8%8C%83%E4%BE%8B">设计模式</a>》一书原先把设计模式分为创建型模式、结构型模式、行为型模式，把它们通过授权、聚合、诊断的概念来描述。若想更进一步了解关于<a title="面向对象的程序设计" class="mw-redirect" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%9A%84%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1">面向对象</a>设计的背景，参考<a title="接口模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E6%8E%A5%E5%8F%A3%E6%A8%A1%E5%BC%8F">接口模式</a>、<a title="內聚性 (計算機科學)" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E5%85%A7%E8%81%9A%E6%80%A7_(%E8%A8%88%E7%AE%97%E6%A9%9F%E7%A7%91%E5%AD%B8)">内聚性</a>。若想更进一步了解关于面向对象编程的背景，参考繼承，<a title="介面 (程式設計)" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E4%BB%8B%E9%9D%A2_(%E7%A8%8B%E5%BC%8F%E8%A8%AD%E8%A8%88)">接口</a>，多型。</p>
<table class="wikitable">
<tbody><tr>
<th>模式名称</th>
<th>描述</th>
<th>《<a title="设计范例" class="mw-redirect" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E8%AE%BE%E8%AE%A1%E8%8C%83%E4%BE%8B">设计模式</a>》中提及</th>
<th>《<a title="代碼大全" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E4%BB%A3%E7%A2%BC%E5%A4%A7%E5%85%A8">代碼大全</a>》中提及<span class="mw-ref" id="cite_ref-McConnell2004_1-0"><a style="counter-reset: mw-Ref 1;" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#cite_note-McConnell2004-1"><span class="mw-reflink-text">[1]</span></a></span></th></tr>
<tr> 
<td colspan="4"><b><a title="創建型模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E5%89%B5%E5%BB%BA%E5%9E%8B%E6%A8%A1%E5%BC%8F">創建型模式</a></b></td></tr>
<tr>
<td><a title="抽象工厂模式" class="mw-redirect" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E6%8A%BD%E8%B1%A1%E5%B7%A5%E5%8E%82%E6%A8%A1%E5%BC%8F">抽象工厂模式</a></td>
<td>为一个产品族提供了统一的创建接口。当需要这个产品族的某一系列的时候，可以从抽象工厂中选出相应的系列创建一个具体的工厂类。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><a title="工厂方法模式" class="mw-redirect" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E5%B7%A5%E5%8E%82%E6%96%B9%E6%B3%95%E6%A8%A1%E5%BC%8F">工厂方法模式</a></td>
<td>定义一个接口用于创建对象，但是让子类决定初始化哪个类。工厂方法把一个类的初始化下放到子类。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><a title="生成器模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E7%94%9F%E6%88%90%E5%99%A8%E6%A8%A1%E5%BC%8F">生成器模式</a></td>
<td>将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="惰性初始模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E6%83%B0%E6%80%A7%E5%88%9D%E5%A7%8B%E6%A8%A1%E5%BC%8F">惰性初始模式</a></td>
<td>推迟对象的创建、数据的计算等需要耗费较多资源的操作，只有在第一次访问的时候才执行。</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="对象池模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E5%AF%B9%E8%B1%A1%E6%B1%A0%E6%A8%A1%E5%BC%8F">对象池模式</a></td>
<td>通过回收利用对象避免获取和释放资源所需的昂贵成本。</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="原型模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E5%8E%9F%E5%9E%8B%E6%A8%A1%E5%BC%8F">原型模式</a></td>
<td>用原型实例指定创建对象的种类，并且通过拷贝这些原型,创建新的对象。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="单例模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E5%8D%95%E4%BE%8B%E6%A8%A1%E5%BC%8F">单例模式</a></td>
<td>确保一个类只有一个实例，并提供对该实例的全局访问。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><span class="ilh-all " data-foreign-title="Multiton pattern" data-lang-name="英语" data-lang-code="en" data-orig-title="多例模式"><span class="ilh-page"><span class="new">多例模式</span></span></span></td>
<td>确保一个类只有命名的实例，并提供对这些实例的全局访问。</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="RAII" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#RAII">资源获取为初始化</a></td>
<td>通过绑定到合适对象的生命周期来确保资源被适当地释放。</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td colspan="4"><b><a title="結構型模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E7%B5%90%E6%A7%8B%E5%9E%8B%E6%A8%A1%E5%BC%8F">結構型模式</a></b></td></tr>
<tr>
<td><a title="适配器模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E9%80%82%E9%85%8D%E5%99%A8%E6%A8%A1%E5%BC%8F">适配器模式</a></td>
<td>将某个类的接口转换成客户端期望的另一个接口表示。适配器模式可以消除由于接口不匹配所造成的类兼容性问题。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><span class="new">桥接模式</span></td>
<td>将一个抽象与实现解耦，以便两者可以独立的变化。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><span class="ilh-all " data-foreign-title="Composite pattern" data-lang-name="英语" data-lang-code="en" data-orig-title="组合模式"><span class="ilh-page"><span class="new">组合模式</span></span></span></td>
<td>把多个对象组成树状结构来表示局部与整体，这样用户可以一样的对待单个对象和对象的组合。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><a title="修饰模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E4%BF%AE%E9%A5%B0%E6%A8%A1%E5%BC%8F">修饰模式</a></td>
<td>向某个对象动态地添加更多的功能。修饰模式是除类继承外另一种扩展功能的方法。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><span class="new">外观模式</span></td>
<td>为子系统中的一组接口提供一个一致的界面， 外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><a title="享元模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E4%BA%AB%E5%85%83%E6%A8%A1%E5%BC%8F">享元</a></td>
<td>通过共享以便有效的支持大量小颗粒对象。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="代理模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E4%BB%A3%E7%90%86%E6%A8%A1%E5%BC%8F">代理</a></td>
<td>为其他对象提供一个代理以控制对这个对象的访问。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td colspan="4"><b><a title="行為型模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E8%A1%8C%E7%82%BA%E5%9E%8B%E6%A8%A1%E5%BC%8F">行為型模式</a></b></td></tr>
<tr>
<td><span class="ilh-all " data-foreign-title="Blackboard (design pattern)" data-lang-name="英语" data-lang-code="en" data-orig-title="黑板系统"><span class="ilh-page"><span class="new">黑板</span></span></span></td>
<td>广义的观察者在系统范围内交流信息，允许多位读者和写者。</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="责任链模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E8%B4%A3%E4%BB%BB%E9%93%BE%E6%A8%A1%E5%BC%8F">责任链</a></td>
<td>为解除请求的发送者和接收者之间耦合，而使多个对象都有机会处理这个请求。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="命令模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E5%91%BD%E4%BB%A4%E6%A8%A1%E5%BC%8F">命令</a></td>
<td>将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可取消的操作。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><span class="ilh-all " data-foreign-title="Interpreter pattern" data-lang-name="英语" data-lang-code="en" data-orig-title="解释器模式"><span class="ilh-page"><span class="new">解释器</span></span></span></td>
<td>给定一个语言, 定义它的文法的一种表示，并定义一个解释器, 该解释器使用该表示来解释语言中的句子。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="迭代器模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E8%BF%AD%E4%BB%A3%E5%99%A8%E6%A8%A1%E5%BC%8F">迭代器</a></td>
<td>提供一种方法顺序访问一个聚合对象中各个元素, 而又不需暴露该对象的内部表示。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><a title="中介者模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E4%B8%AD%E4%BB%8B%E8%80%85%E6%A8%A1%E5%BC%8F">中介者</a></td>
<td>包装了一系列对象相互作用的方式，使得这些对象不必相互明显作用，从而使它们可以松散偶合。当某些对象之间的作用发生改变时，不会立即影响其他的一些对象之间的作用，保证这些作用可以彼此独立的变化。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><span class="ilh-all " data-foreign-title="Memento pattern" data-lang-name="英语" data-lang-code="en" data-orig-title="备忘录模式"><span class="ilh-page"><span class="new">备忘录</span></span></span></td>
<td>备忘录对象是一个用来存储另外一个对象内部状态的快照的对象。备忘录模式的用意是在不破坏封装的条件下，将一个对象的状态捉住，并外部化，存储起来，从而可以在将来合适的时候把这个对象还原到存储起来的状态。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="空对象模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E7%A9%BA%E5%AF%B9%E8%B1%A1%E6%A8%A1%E5%BC%8F">空对象</a></td>
<td>通过提供默认对象来避免空引用。</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><a title="观察者模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F">观察者模式</a></td>
<td>在对象间定义一个一对多的联系性，由此当一个对象改变了状态，所有其他相关的对象会被通知并且自动刷新。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><span class="ilh-all " data-foreign-title="Specification pattern" data-lang-name="英语" data-lang-code="en" data-orig-title="规格模式"><span class="ilh-page"><span class="new">规格</span></span></span></td>
<td>以布尔形式表示的可重绑定的商业逻辑。</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><span class="ilh-all " data-foreign-title="State pattern" data-lang-name="英语" data-lang-code="en" data-orig-title="状态模式"><span class="ilh-page"><span class="new">状态</span></span></span></td>
<td>让一个对象在其内部状态改变的时候，其行为也随之改变。状态模式需要对每一个系统可能取得的状态创立一个状态类的子类。当系统的状态变化时，系统便改变所选的子类。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="策略模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F">策略</a></td>
<td>定义一个算法的系列，将其各个分装，并且使他们有交互性。策略模式使得算法在用户使用的时候能独立的改变。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><a title="模板方法模式" class="mw-redirect" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E6%A8%A1%E6%9D%BF%E6%96%B9%E6%B3%95%E6%A8%A1%E5%BC%8F">模板方法</a></td>
<td>模板方法模式准备一个抽象类，将部分逻辑以具体方法及具体构造子类的形式实现，然后声明一些抽象方法来迫使子类实现剩余的逻辑。不同的子类可以以不同的方式实现这些抽象方法，从而对剩余的逻辑有不同的实现。先构建一个顶级逻辑框架，而将逻辑的细节留给具体的子类去实现。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td></tr>
<tr>
<td><a title="访问者模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E8%AE%BF%E9%97%AE%E8%80%85%E6%A8%A1%E5%BC%8F">访问者</a></td>
<td>封装一些施加于某种数据结构元素之上的操作。一旦这些操作需要修改，接受这个操作的数据结构可以保持不变。访问者模式适用于数据结构相对未定的系统，它把数据结构和作用于结构上的操作之间的耦合解脱开，使得操作集合可以相对自由的演化。</td>
<td class="table-yes" style="text-align:center; background:#90FF90">是</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td colspan="4"><b><a title="併發型模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E4%BD%B5%E7%99%BC%E5%9E%8B%E6%A8%A1%E5%BC%8F">併發型模式</a></b></td></tr>
<tr>
<td><span class="new">主动对象</span></td>
<td></td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><span class="new">阻碍</span></td>
<td></td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="双重检查锁定模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E5%8F%8C%E9%87%8D%E6%A3%80%E6%9F%A5%E9%94%81%E5%AE%9A%E6%A8%A1%E5%BC%8F">双重检查锁定</a></td>
<td></td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><span class="new">守卫</span></td>
<td></td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><span class="new">领导者/追随者</span></td>
<td></td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="管程" class="mw-redirect" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E7%AE%A1%E7%A8%8B">监测对象模式</a></td>
<td></td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="读写锁模式" class="mw-redirect" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E8%AF%BB%E5%86%99%E9%94%81%E6%A8%A1%E5%BC%8F">读写锁</a></td>
<td></td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><span class="new">调度</span></td>
<td></td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><span class="new">线程池模式</span></td>
<td></td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><span class="new">线程特定存储</span></td>
<td></td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
<tr>
<td><a title="反应器模式" href="file:///C:/Users/STAR/Downloads/Kiwix.KiwixJS_mc3511b08yc0e!App/%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%20(%E8%AE%A1%E7%AE%97%E6%9C%BA).html#%E5%8F%8D%E5%BA%94%E5%99%A8%E6%A8%A1%E5%BC%8F">反应器</a></td>
<td></td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td>
<td class="table-no" style="text-align:center; background:#FF9090">否</td></tr>
</tbody></table>


​    





