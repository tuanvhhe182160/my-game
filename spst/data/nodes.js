// ─────────────────────────────────────
// KNOWLEDGE DATABASE
// ─────────────────────────────────────
const KDB = {
  lanh:    {icon:'🌿', title:'Cây lanh & vải lanh',      text:'Người Mông trồng cây lanh lấy sợi, dệt thành vải bằng tay. Từ hạt giống đến tấm vải mất cả tháng. Đây là công việc của phụ nữ, bắt đầu học từ năm 7–8 tuổi.'},
  tuong:   {icon:'🏠', title:'Nhà trình tường',           text:'Tường nhà nện bằng đất dày 40–60cm — giữ ấm mùa đông, mát mùa hè. Nhiều ngôi nhà do ông nội xây vẫn đứng vững qua vài thế hệ.'},
  vayphong:{icon:'👗', title:'Váy phụ nữ Mông',           text:'Váy nhuộm chàm, thêu hoa văn hình học tay. Mỗi bản có hoa văn khác nhau — nhìn váy là biết người từ đâu. Làm một bộ mất nhiều tháng.'},
  chenphong:{icon:'🎨',title:'Nghề thêu truyền thống',    text:'Không có mẫu vẽ sẵn — hoa văn truyền qua ký ức từ mẹ sang con. Phụ nữ Mông bắt đầu học thêu từ lúc còn nhỏ xíu.'},
  menmen:  {icon:'🌽', title:'Mèn mén — lương thực chính',text:'Ngô xay nhỏ đồ chín trong chõ gỗ, thay cơm hàng ngày. Ngô sống được trên đất đá núi cao — gắn bó với người Mông qua nhiều thế kỷ.'},
  ruou:    {icon:'🍶', title:'Rượu ngô men lá',            text:'Chưng cất thủ công bằng men lá rừng — trong vắt, ấm bụng. Rót rượu mời khách là cử chỉ tôn trọng cao nhất của người Mông.'},
  chophien:{icon:'🎪', title:'Chợ phiên vùng cao',         text:'Họp mỗi tuần — không chỉ mua bán, còn là nơi gặp gỡ, hẹn hò, trao đổi tin tức giữa các bản. Nhiều đôi vợ chồng gặp nhau lần đầu ở chợ phiên.'},
  chotinh: {icon:'💕', title:'Chợ tình Khâu Vai',          text:'Mỗi năm một lần, 27/3 âm lịch. Nơi những người yêu cũ gặp lại — không ai phán xét. Vừa buồn vừa đẹp.'},
  kenla:   {icon:'🎵', title:'Kèn lá & tiếng gọi tình',   text:'Dùng lá cây thổi thành nhạc để bày tỏ tình cảm. Chàng trai thổi đứng gần — cô gái nghe và đáp lại nếu đồng ý. Mỗi giai điệu là một thông điệp.'},
  khen:    {icon:'🪗', title:'Khèn — linh hồn người Mông', text:'6 ống trúc ghép lại, vừa thổi vừa múa. Tiếng khèn là cầu nối giữa người sống và tổ tiên — không thể thiếu trong đám tang và lễ hội.'},
  tetmong: {icon:'🎊', title:'Tết Mông (Nào Pê Chầu)',     text:'Tháng 11–12 âm lịch, sau mùa thu hoạch. Cả bản nghỉ ba ngày, nhà nhà giết lợn, gói bánh giầy, bố thổi khèn bên bếp lửa.'},
};

const COL_GROUPS = [
  {label:'Cuộc sống & nhà ở', items:['tuong','lanh']},
  {label:'Trang phục & nghề thủ công', items:['vayphong','chenphong']},
  {label:'Âm nhạc', items:['kenla','khen']},
  {label:'Ẩm thực & lễ hội', items:['menmen','ruou','chophien','chotinh','tetmong']},
];

// Affection milestones
const AFF_MILESTONES = [
  {pts:0,   status:'Người lạ',     face:'🙂'},
  {pts:25,  status:'Quen rồi',     face:'😊'},
  {pts:55,  status:'Hay đó...',    face:'😏'},
  {pts:85,  status:'Ấn tượng đó', face:'😍'},
  {pts:115, status:'Thích lắm',   face:'🥰'},
  {pts:145, status:'Tri kỷ',       face:'💕'},
];

// ─────────────────────────────────────
// STORY NODES
// ─────────────────────────────────────
// Format: { id, chLabel(chapter label), sc(scene bg), em(emoji), mood, txt, choices:[ {t,p,n,u?,mg?} ] }
// u = unlock knowledge key
// mg = 'kl' or 'tp' (trigger mini game)

const NODES = {};
[
/* ═══ CHAPTER 1 ═══ */
{id:'c1_a', chLabel:'Chương 1 · Gặp gỡ', sc:'village', em:'😏', mood:'*nghiêng đầu*',
 txt:'Ơ kìa! Khách dưới xuôi cứ đứng ngẩn ra trước cổng bản thế à? Cẩn thận sương lạnh đấy nhé. Mình là Mỷ. Bạn lạc đường hay đang tìm nhà ai?',
 choices:[
   {th:'Cô gái này có cách bắt chuyện thẳng thắn và đôi mắt sáng rực. Tự nhiên mình thấy bối rối ngang.', t:'Mình là [Tên]. Thật ra mình không lạc đường, chỉ là tự nhiên thấy người đứng ở cổng bản... thú vị quá nên mình quên mất định đi đâu thôi.', p:10, n:'c1_dep'},
   {th:'Mình nên giữ khoảng cách và lịch sự, không lại bị đánh giá là khách vãng lai tọc mạch.', t:'Chào Mỷ, mình là [Tên]. Mình đang đi ngắm cảnh thôi, bản của bạn yên bình và đẹp quá.', p:5, n:'c1_lac'}
 ]},

{id:'c1_dep', chLabel:'Chương 1 · Gặp gỡ', sc:'village', em:'🤭', mood:'*cười nửa miệng*',
 txt:'Khéo miệng ghê chưa! Con trai dưới xuôi các bạn ai lên đây cũng dẻo miệng vậy à? Cứ tưởng mình không biết bạn đang nịnh chắc? Nhưng thôi... nghe cũng lọt tai. Bạn lên đây lần đầu đúng không?',
 choices:[
   {th:'Sự kiêu kỳ này làm mình càng muốn tìm hiểu hơn. Cô ấy không giống những gì mình tưởng tượng.', t:'Đúng là lần đầu. Và mình nhận ra mình không chỉ muốn ngắm cảnh nữa. Mình muốn ở lại lâu một chút để hiểu hơn về cuộc sống ở đây... và về người ở đây.', p:10, n:'c1_tim'},
   {th:'Bị bắt bài nhanh quá, tốt nhất là nên quay lại chủ đề an toàn.', t:'Lần đầu Mỷ ơi. Hỏi thật nhé — bạn thấy có điều gì ở bản mình là đặc biệt nhất không? Vì mình mới lên, chưa biết nên ngắm từ đâu.', p:7, n:'c1_ban'}
 ]},

{id:'c1_lac', chLabel:'Chương 1 · Gặp gỡ', sc:'village', em:'😏', mood:'*cười nhẹ*',
 txt:'Khen bản đẹp thì mình nhận, nhưng con trai dưới xuôi lên đây ai cũng nói câu sáo rỗng thế à? Muốn thấy cái đẹp thực sự thì phải đi sâu vào cơ. Mà bạn tính đứng đây ngắm cảnh đến tối luôn sao?',
 choices:[
   {th:'Lời trêu chọc tự nhiên khiến mình thấy thoải mái hơn hẳn.', t:'Đâu có, tại ngắm Mỷ nói chuyện cuốn quá nên mình quên mất thời gian đấy chứ. Mỷ có thể dẫn mình đi xem quanh bản được không?', p:12, n:'c1_cuoi'},
   {th:'Nên hỏi han nghiêm túc về cuộc sống ở đây xem sao.', t:'Không đâu, mình cũng muốn vào bản tìm hiểu xem mọi người sinh hoạt thế nào. Hằng ngày Mỷ thường làm những việc gì vậy?', p:8, n:'c2_daily'}
 ]},

{id:'c1_tim', chLabel:'Chương 1 · Gặp gỡ', sc:'village', em:'🤭', mood:'*bật cười tinh nghịch*',
 txt:'Muốn ở lại lâu để hiểu về mình cơ à? Bạo dạn đấy chứ! Nhưng núi rừng Hà Giang và con gái trên này không dễ hiểu thế đâu nha. Bạn có chắc là đủ kiên nhẫn không đó?',
 choices:[
   {th:'Ánh mắt thách thức của cô ấy làm mình càng thêm quyết tâm.', t:'Càng khó mình càng muốn thử. Mình tự tin là mình có thừa sự kiên nhẫn để tìm hiểu mọi thứ về Mỷ.', p:15, n:'c1_cuoi'},
   {th:'Thu mình lại một chút để giữ thế chủ động.', t:'Ý mình là hiểu về cuộc sống của mọi người trên này ấy chứ. Nhưng nếu Mỷ sẵn lòng kể về bản thân thì mình rất vinh hạnh.', p:10, n:'c1_cuoi'}
 ]},

{id:'c1_ban', chLabel:'Chương 1 · Gặp gỡ', sc:'village', em:'😌', mood:'*khoanh tay kiêu kỳ*',
 txt:'Đặc biệt nhất á? Là mình chứ ai nữa! Đùa thôi, bản mình nhỏ xíu nhưng có nhà trình tường của ông nội xây mấy chục năm, có tiếng chày dệt vải lanh suốt ngày đêm. Bạn muốn nghe cái nào trước?',
 choices:[
   {th:'Sự tự tin đáng yêu này làm mình bật cười.', t:'Mình thấy Mỷ nói đúng đấy chứ, Mỷ là điều đặc biệt nhất mình gặp hôm nay rồi. Nhưng mình cũng tò mò về ngôi nhà của Mỷ nữa.', p:12, n:'c1_cuoi'},
   {th:'Tìm hiểu về văn hóa dệt vải trước xem sao.', t:'Tiếng chày dệt vải lanh nghe có vẻ thú vị đó. Mẹ của Mỷ đang dệt vải ở trong nhà hả?', p:10, n:'c2_me'}
 ]},

{id:'c1_cuoi', chLabel:'Chương 1 · Gặp gỡ', sc:'village', em:'😌', mood:'*nhướng mày*',
 txt:'Haha! Bạn để ý kỹ thế? Mẹ nói mình cười nhiều quá, mặt không nghiêm được. Nhưng mà... bạn thấy nụ cười này phiền à? Hay là đang cố tìm cớ để khen mình đấy?',
 choices:[
   {th:'Cô ấy hoàn toàn biết rõ sức hút của mình. Mình không cần phải giấu diếm.', t:'Khen thật mà! Trông dễ thương lắm. Mình nghĩ đó là điểm khiến người đối diện không thể rời mắt được đấy.', p:15, n:'c1_reaction'},
   {th:'Hơi áp đảo rồi, mình chỉ nhận xét bình thường thôi mà.', t:'Không sao gì hết — cười nhiều là tốt mà! Thôi, kể mình nghe thêm về gia đình đi Mỷ.', p:8, n:'c2_bome'}
 ]},

{id:'c1_reaction', chLabel:'Chương 1 · Gặp gỡ', sc:'village', em:'😏', mood:'*khoanh tay*',
 txt:'Được rồi, mình ghi nhận lời khen. Chấm cho bạn 8 điểm vì sự chân thành. Muốn được 10 điểm thì phải xem bạn có thực sự kiên nhẫn muốn hiểu về tụi mình không đã. Hỏi gì đi, mình kể cho.',
 choices:[
   {th:'Rõ ràng là cô ấy đang ra bài test cho mình đây.', t:'Được thôi, mình nhận thử thách. Bắt đầu từ ngôi nhà của Mỷ nhé, mình có thể vào thăm được không?', p:10, n:'c2_vao'},
   {th:'Chuyển chủ đề thôi, mình tò mò về âm thanh lúc nãy hơn.', t:'Bạn ơi — trong nhà có tiếng lạch cạch đều lắm, mẹ bạn đang làm gì vậy?', p:12, n:'c2_me'}
 ]},
/* ═══ CHAPTER 2 ═══ */
{id:'c2_daily', chLabel:'Chương 2 · Cuộc sống', sc:'village', em:'🤔', mood:'*nghĩ*',
 txt:'Cuộc sống hàng ngày... Sáng dậy nấu cơm, cho gà ăn. Phụ mẹ dệt một lúc. Trưa mang cơm lên nương cho bố. Chiều về thêu hoặc ra đầu bản ngồi với bạn. Vậy thôi — nghe chán không?',
 choices:[{th:'Nghe thì bình thường nhưng mình hình dung ra cảnh đó là thấy đẹp lạ.', t:'Không chán tí nào! Mỷ nói mẹ dệt vải — dệt loại vải gì vậy? Mình chưa thấy bao giờ.', p:10, n:'c2_me'},
          {t:'Trưa mang cơm lên nương — xa không vậy? Leo núi mỗi ngày chắc mệt lắm chứ?', p:8, n:'c2_nuong'}]},

{id:'c2_scene', chLabel:'Chương 2 · Cuộc sống', sc:'village', em:'😊', mood:'',
 txt:'Ừ, ngắm đi. Chỗ này mình hay ngồi buổi chiều. Bên kia là nương của bố mình — thấy cái sườn núi xanh kia không? Ngô đang lên đó.',
 choices:[{t:'Ngô trồng trên núi cao vậy — đất có màu mỡ không thế?', p:6, n:'c2_nuong'},
          {th:'Mình chú ý cái bức tường đất cạnh đó.',t:'Mỷ ơi — nhà bên cạnh kia tường đất à? Cách làm thế nào mà vững vậy?', p:8, n:'c2_nha', u:'tuong'}]},

{id:'c2_vao', chLabel:'Chương 2 · Cuộc sống', sc:'home', em:'😄', mood:'*xua tay*',
 txt:'Vào chứ! Nhà mình khách vào là vui. Mẹ mình mà thấy là lấy nước ra mời liền. Nhưng phải bỏ giày bên ngoài nhé — tục của nhà mình vậy.',
 choices:[{th:'Mình bỏ giày ngay.',t:'Biết rồi ạ! Ủa — nhà làm bằng đất đúng không? Mình nhìn cái tường mà thấy khác lạ lắm.', p:8, n:'c2_nha', u:'tuong'},
          {t:'Ơ, tiếng gì vậy Mỷ? Từ góc trong đó.', p:10, n:'c2_me'}]},

{id:'c2_nha', chLabel:'Chương 2 · Cuộc sống', sc:'home', em:'😊', mood:'*tự hào*',
 txt:'Nhà trình tường đó! Tường nện bằng đất, dày gần nửa mét. Ông nội xây mấy chục năm trước — đến giờ vẫn đứng như vậy. Mùa đông lạnh cắt da bên ngoài mà vào nhà là ấm ngay. Hay không?',
 choices:[{t:'Hay thật! Mình chưa thấy nhà kiểu này bao giờ. Bên trong trông như thế nào vậy?', p:8, n:'c2_trongnha'},
          {th:'Mình nhìn cái tường dày mà thấy nể — không xi măng không gạch nung mà vững mấy chục năm.',t:'Vậy mà chỉ dùng đất thôi sao?', p:10, n:'c2_xaynha'}]},

{id:'c2_xaynha', chLabel:'Chương 2 · Cuộc sống', sc:'home', em:'😌', mood:'',
 txt:'Đất lẫn cát, đôi khi thêm rơm cho chắc. Đổ vào khuôn gỗ rồi nén chặt từng lớp. Không cần xi măng, không cần gạch nung — vật liệu lấy ngay từ đất dưới chân. Bố mình nói cái gì của núi rừng thì phải làm từ núi rừng.',
 choices:[{th:'Nghe deep thật.',t:'Hay thật. Vậy bên trong nhà trông như thế nào vậy?', p:8, n:'c2_trongnha'},
          {t:'Mình nghe tiếng gì đó trong nhà từ nãy — mẹ Mỷ đang làm gì vậy?', p:10, n:'c2_me'}]},

{id:'c2_trongnha', chLabel:'Chương 2 · Cuộc sống', sc:'home', em:'😌', mood:'*nhìn quanh*',
 txt:'Gian chính đây — bếp lửa ở giữa, cả nhà ngồi đây ăn cơm. Chỗ tường kia có bàn thờ, không ai ngồi quay lưng vào. À bạn nghe tiếng gì không? Từ góc phải đó.',
 choices:[{th:'tiếng lạch cạch đều đều, nhịp nhàng.',t:'Nghe rồi — lạch cạch đều lắm. Là gì vậy Mỷ?', p:12, n:'c2_me'},
          {t:'Nghe rồi. Nhưng mình tò mò — khói bếp không bay lên mái nhà à?', p:5, n:'c2_bep'}]},

{id:'c2_bep', chLabel:'Chương 2 · Cuộc sống', sc:'home', em:'😄', mood:'*cười*',
 txt:'Haha, bay chứ! Hồi nhỏ mình hay cay mắt. Nhưng trên mái có khe hở để thoát. Và bếp này ấm lắm — mùa đông cả nhà ngồi quây quanh đây kể chuyện đến khuya. Tiếng lạch cạch đó là mẹ mình đấy...',
 choices:[{t:'Mẹ bạn đang làm gì vậy — mình nghe nhịp đều lắm?', p:10, n:'c2_me'}]},

{id:'c2_me', chLabel:'Chương 2 · Cuộc sống', sc:'home', em:'🥰', mood:'*nhìn về phía mẹ*',
 txt:'Mẹ mình đang dệt vải lanh đó. Mỗi sáng bà dậy sớm, ngồi dệt trước khi làm việc khác. Mình cũng đang học — nhưng chậm lắm. Tay mẹ thoăn thoắt, không nhìn mà vẫn đều. Mình thì phải nhìn từng sợi.',
 choices:[{th:'Mình chưa bao giờ nghe đến vải lanh trước đây',t:'Vải lanh là vải gì vậy? Mình ở dưới xuôi chưa thấy bao giờ.', p:12, n:'c2_lanh', u:'lanh'},
          {t:'Đó mà là chậm sao? Hay là mẹ Mỷ dệt nhanh quá?', p:8, n:'c2_hocdet'}]},

{id:'c2_hocdet', chLabel:'Chương 2 · Cuộc sống', sc:'home', em:'😅', mood:'*cười ngại*',
 txt:'Chậm thật mà. Mẹ không nói gì nhưng mình thấy mẹ cười — chắc thấy mình buồn cười. Dệt vải cần kiên nhẫn lắm, mà mình hay mơ màng. Đang dệt mà nhìn ra cửa sổ quá.',
 choices:[{th:'Dễ thương thật',t:'Nhìn ra cửa sổ thấy gì mà mê vậy Mỷ?', p:10, n:'c2_cuaso'},
          {th:'Bộ váy Mỷ đang mặc — thêu tinh tế đến mức khó tin là làm bằng tay.',t:'Váy Mỷ đang mặc mình ngắm mãi — cũng tự tay thêu à?', p:12, n:'c3_vay'}]},

{id:'c2_cuaso', chLabel:'Chương 2 · Cuộc sống', sc:'home', em:'😌', mood:'*nhìn xa*',
 txt:'Thấy núi. Thấy con đường đất dẫn xuống chợ. Đôi khi thấy mấy con ngựa thồ hàng đi qua. Mình hay nghĩ lung tung — không biết bạn có vậy không?',
 choices:[{t:'Mình cũng vậy. Mỷ hay nghĩ về điều gì nhất vậy — nếu chia sẻ được?', p:12, n:'c2_nghi'},
          {th:'Mình nhìn theo hướng mắt cô ấy nhìn — và hiểu tại sao khó mà không mơ được.',t:'Mình cũng vậy đó. Mà nhìn váy Mỷ mặc, mình cứ thắc mắc — tự tay thêu à?', p:10, n:'c3_vay'}]},

{id:'c2_nghi', chLabel:'Chương 2 · Cuộc sống', sc:'village', em:'😊', mood:'*ngập ngừng*',
 txt:'Mình hay nghĩ... không biết ngoài bản này có gì. Rồi lại nghĩ — người ta ở ngoài đó có thấy thiếu gì không, hay chỉ mình thấy tò mò. Bạn từ đâu tới vậy?',
 choices:[{th:'Câu hỏi đó làm mình nhìn lại chính mình một chút — thật ra ngoài đó cũng có những thứ đang thiếu mà không nhận ra.', t:'Mình từ thành phố lên. Thành thật mà nói — ngoài đó có nhiều thứ nhưng chắc cũng có nhiều thứ mình đang thiếu mà chưa biết.', p:15, n:'c2_nghi2'},
          {t:'Mình từ Hà Nội lên. Ngoài đó nhiều thứ lắm — nhưng ồn ào hơn ở đây nhiều.', p:12, n:'c2_nghi2'}]},

{id:'c2_nghi2', chLabel:'Chương 2 · Cuộc sống', sc:'village', em:'😊', mood:'*gật đầu*',
 txt:'Ừ... mình nghĩ vậy. Thôi không mơ nữa — hỏi gì tiếp đi, mình hay kể lắm đó.',
 choices:[{th:'Bộ váy thêu tinh xảo của cô ấy — mình muốn hỏi về điều này từ lâu rồi.',t:'Từ nãy mình cứ ngắm váy Mỷ mặc — đẹp lắm, tự thêu tay à?', p:10, n:'c3_vay'},
          {t:'Mỷ học ở đâu vậy? Trường cách bản xa không?', p:8, n:'c2_truong'}]},

{id:'c2_truong', chLabel:'Chương 2 · Cuộc sống', sc:'village', em:'😌', mood:'*nhớ lại*',
 txt:'Trường huyện, cách khoảng 12 cây số. Hồi nhỏ ở nội trú cả tuần. Buồn lắm — nhớ nhà, nhớ mẹ. Nhưng nhờ vậy mình nói được tiếng Kinh, không thì giờ không chuyện trò với bạn được đâu.',
 choices:[{t:'May mắn cho mình quá — vì nhờ vậy mới được nói chuyện với Mỷ hôm nay. Mà vất vả vậy — Mỷ sau này muốn làm gì không?', p:12, n:'c2_tuonglai'},
          {t:'Vất vả thật đấy. Mình thấy phục Mỷ kiên trì lắm. Giờ nhìn lại thấy xứng đáng không?', p:8, n:'c2_truong2'}]},

{id:'c2_truong2', chLabel:'Chương 2 · Cuộc sống', sc:'village', em:'😊', mood:'*cười thật*',
 txt:'Haha — bạn nịnh khéo đó! Thôi thôi, hỏi gì tiếp đi.',
 choices:[{th:'Mình nói thật mà.',t:'Không phải nịnh đâu, mình nghĩ vậy thật! À — từ nãy mình cứ để ý váy Mỷ mặc — tự thêu à?', p:10, n:'c3_vay'},
          {t:'Vậy tương lai Mỷ muốn làm gì — có tính gì chưa?', p:8, n:'c2_tuonglai'}]},

{id:'c2_tuonglai', chLabel:'Chương 2 · Cuộc sống', sc:'village', em:'😊', mood:'*cười nhỏ*',
 txt:'Chưa biết. Có người nói học thêm rồi xuống thị trấn làm. Có người nói ở lại bản, nuôi gà, dệt vải, lấy chồng. Mình... chưa quyết. Bạn nghĩ mình nên làm gì?',
 choices:[{t:'Mình nghĩ... điều nào khi nghĩ đến thì tim Mỷ thấy nhẹ hơn — thì đó là đường đúng. Không ai biết câu trả lời đó ngoài Mỷ.', p:15, n:'c3_vay'},
          {th:'Câu này khó vậy.',t:'Mình nghĩ hai điều đó không nhất thiết phải chọn một. Có thể làm cả hai theo cách của riêng Mỷ.', p:12, n:'c3_vay'}]},

{id:'c2_nuong', chLabel:'Chương 2 · Cuộc sống', sc:'village', em:'😄', mood:'*cười*',
 txt:'Xa và mệt chứ! Nương trên sườn núi kia, đi mất 40 phút. Nhưng quen rồi — từ hồi lớp 3 mình đã leo cùng mẹ. Ngô ở đây không thẳng như dưới xuôi — cây thấp, hạt nhỏ, nhưng ngọt hơn.',
 choices:[{t:'Ngô ngọt hơn à? Bạn hay ăn món gì nhất từ ngô thế?', p:10, n:'c4_menmen', u:'menmen'},
          {t:'Lớp 3 đã leo nương rồi — vất vả thật. Bố mẹ Mỷ làm thêm nghề gì khác không?', p:8, n:'c2_bome'}]},

{id:'c2_bome', chLabel:'Chương 2 · Cuộc sống', sc:'home', em:'🥰', mood:'',
 txt:'Bố làm nương, nuôi ngựa. Mẹ dệt vải, thêu thùa. Hai người hay làm việc cùng nhau — mẹ ra nương cùng bố buổi sáng rồi về sớm dệt vải chiều. Mình thấy họ không cần nói nhiều vẫn hiểu nhau.',
 choices:[{t:'Nghe ấm lòng lắm. Mỷ học thêu từ mẹ à — bắt đầu từ hồi nhỏ?', p:10, n:'c3_vay'},
          {t:'Gia đình Mỷ hạnh phúc thật đó. Bố Mỷ có thổi khèn không? Mình nghe Mỷ nhắc đến rồi.', p:12, n:'c3_khen', u:'khen'}]},

{id:'c2_lanh', chLabel:'Chương 2 · Cuộc sống', sc:'home', em:'😊', mood:'',
 txt:'Cây lanh! Mình trồng sau vườn, thu hoạch, tách sợi, se lại thành chỉ rồi mới dệt. Từ khi trồng đến khi có vải mất cả tháng. Mẹ nói hồi xưa không có vải mua — tất cả phải tự làm từ đầu.',
 choices:[{th:'Cả tháng ròng?',t:'Vậy váy Mỷ đang mặc là tự làm từ đầu luôn à? Cả thêu nữa?', p:12, n:'c3_vay'},
          {t:'Kỳ công quá — bây giờ bản mình vẫn còn trồng lanh không?', p:8, n:'c3_lanh2'}]},

{id:'c3_lanh2', chLabel:'Chương 3 · Văn hóa', sc:'home', em:'😌', mood:'',
 txt:'Vẫn còn — nhưng ít hơn. Vải chàm mua ngoài chợ rẻ hơn, nhanh hơn. Mẹ mình vẫn giữ một ô lanh nhỏ — bảo để con cái biết nguồn gốc. Mình nghe vậy thấy... không biết, thấy phải gìn giữ.',
 choices:[{th:'Không phải ai cũng làm được',t:'Mỷ giỏi lắm khi giữ điều đó. Mà từ nãy mình cứ nhìn váy Mỷ — kể mình nghe về cái thêu đó được không?', p:12, n:'c3_vay'}]},

/* ═══ CHAPTER 3 ═══ */
{id:'c3_vay', chLabel:'Chương 3 · Văn hóa', sc:'home', em:'😊', mood:'*nhìn xuống váy*',
 txt:'Váy này mẹ làm cho mình năm ngoái! Nhuộm chàm rồi thêu hoa văn tay — mỗi bản Mông có hoa văn khác nhau. Nhìn là biết người từ đâu. Làm cả mấy tháng mới xong.',
 choices:[{th:'1 tấm vải có thể kể được người ta từ đâu. Độc đáo hơn bất cứ tên đất tên người nào.',t:'Mỷ có thể chỉ mình các hoa văn đó có ý nghĩa gì không? Mình muốn hiểu thật sự chứ không chỉ ngắm.', p:12, n:'c3_hoavan', u:'vayphong'},
          {t:'Mình có thể thử ghép trang phục theo kiểu người Mông không? Mỷ chỉ cho mình với!', p:8, n:'__MG_TP__', mg:'tp'}]},

{id:'c3_hoavan', chLabel:'Chương 3 · Văn hóa', sc:'home', em:'😌', mood:'*chỉ vào váy*',
 txt:'Cái hình thoi là ruộng bậc thang. Cái chéo chéo là đường núi. Hoa tám cánh là may mắn. Không ai dạy ý nghĩa — mình nhìn mẹ thêu, tự hiểu dần. Bạn thấy cái nào đẹp nhất?',
 choices:[{t:'Hoa tám cánh — vừa tinh xảo vừa có ý nghĩa, mình thích nhất cái đó.', p:12, n:'c3_hoavan2', u:'chenphong'},
          {t:'Ruộng bậc thang — nhìn là thấy Hà Giang hiện ra trong đầu luôn.', p:10, n:'c3_hoavan2', u:'chenphong'}]},

{id:'c3_hoavan2', chLabel:'Chương 3 · Văn hóa', sc:'home', em:'😊', mood:'*vui*',
 txt:'Bạn nhìn tinh đó! Mình thêu cái hoa đó mất hai tuần — sai một mũi là phải tháo lại hết. Nghề thêu của người Mông truyền từ mẹ sang con, không có sách — chỉ có mắt và tay.',
 choices:[{th:'2 tuần cho một bông hoa nhỏ...',t:'Nghe kỳ công quá. Mình tò mò — âm nhạc người Mông thì sao? Bố Mỷ thổi khèn đúng không?', p:8, n:'c3_khen'},
          {t:'Không có sách mà vẫn truyền được — điều đó nghe hay lắm. Còn kèn lá — Mỷ có biết không?', p:10, n:'c3_kenla'}]},

{id:'c3_khen', chLabel:'Chương 3 · Văn hóa', sc:'village', em:'🥰', mood:'*sáng mắt*',
 txt:'Khèn! Bố mình thổi mỗi tối. 6 ống trúc ghép lại — vừa thổi vừa múa được. Tiếng khèn nghe xa lắm, xuyên qua núi. Người Mông nói khèn là cầu nối với tổ tiên — không thể thiếu trong đám tang hay lễ hội.',
 choices:[{t:'Bố có dạy Mỷ thổi không? Hay chỉ dành cho con trai thôi?', p:10, n:'c3_khen2', u:'khen'},
          {t:'Còn kèn lá — mình nghe Mỷ nhắc thoáng qua, cô gái thổi đúng không?', p:12, n:'c3_kenla'}]},

{id:'c3_khen2', chLabel:'Chương 3 · Văn hóa', sc:'village', em:'😅', mood:'*cười ngại*',
 txt:'Có dạy nhưng mình chưa được. Khèn là của con trai — con gái thổi kèn lá. Mỗi người một nhạc cụ. Bố hay thổi ngoài hiên buổi tối, mình ngồi nghe. Không cần biết thổi cũng thấy đủ.',
 choices:[{t:'Kèn lá là gì thế? Cô gái thổi — mình tò mò lắm.', p:12, n:'c3_kenla'},
          {t:'*Mình hình dung cảnh ngồi bên bếp nghe tiếng khèn — và thấy đó là điều xa xỉ theo cách mà tiền không mua được.* Nghe buổi tối có tiếng khèn vang ra — chắc đẹp lắm nhỉ.', p:8, n:'c4_intro'}]},

{id:'c3_kenla', chLabel:'Chương 3 · Văn hóa', sc:'village', em:'😊', mood:'*hơi bẽn lẽn*',
 txt:'Kèn lá là... dùng lá cây thổi thành nhạc. Chàng trai hay thổi để bày tỏ tình cảm. Cô gái nghe — thích thì ở lại, không thích thì đi. Không ai nói thẳng — nhạc nói thay. Mình biết thổi một chút...',
 choices:[{t:'Mỷ có thể dạy mình thổi thử không? Mình muốn cảm nhận xem nhạc nói thay mình được gì.', p:15, n:'__MG_KL__', mg:'kl'},
          {t:'Lãng mạn thật. Đã có ai thổi kèn lá cho Mỷ nghe chưa?', p:12, n:'c5_tinh'}]},

/* Từ mini-game Kèn lá quay về */
{id:'c3_kl_perfect', chLabel:'Chương 3 · Văn hóa', sc:'village', em:'🥰', mood:'*nhìn chăm chú*',
 txt:'Bạn thổi được thật — mình không ngờ. Thường người ngoài cầm lá là thổi sai hết. Bạn... có cảm giác với âm nhạc đó.',
 choices:[{t:'Vì mình muốn nói điều gì đó qua tiếng nhạc đó... nhưng chưa biết Mỷ hiểu không.', p:18, n:'c4_intro'},
          {t:'Mỷ dạy hay lắm. Mình cảm ơn Mỷ đã kiên nhẫn — còn gì muốn chỉ mình không?', p:12, n:'c4_intro'}]},

{id:'c3_kl_good', chLabel:'Chương 3 · Văn hóa', sc:'village', em:'😊', mood:'*gật đầu*',
 txt:'Khá đó. Lần đầu mà vậy là được. Tiếp tục thì chắc thổi được bài đầy đủ. Mình... thích nghe bạn thổi.',
 choices:[{t:'Mình sẽ luyện thêm. Hứa với Mỷ.', p:12, n:'c4_intro'},
          {t:'Cảm ơn Mỷ đã kiên nhẫn dạy mình — mình biết mình còn vụng lắm.', p:10, n:'c4_intro'}]},

{id:'c3_kl_bad', chLabel:'Chương 3 · Văn hóa', sc:'village', em:'😄', mood:'*cười thật*',
 txt:'Haha! Không sao — lần đầu ai cũng vậy. Ít nhất bạn dám thử. Lần sau mình dạy lại.',
 choices:[{t:'Nóng mặt quá.',t:' Haha xấu hổ thật — nhưng mình sẽ về luyện. Kể mình nghe chuyện khác đi Mỷ ơi!', p:6, n:'c4_intro'},
          {t:'Mình sẽ về tập thêm rồi khoe lại với Mỷ. Cảm ơn đã không chê mình nhé!', p:8, n:'c4_intro'}]},

/* Từ mini-game Trang phục quay về */
{id:'c3_tp_perfect', chLabel:'Chương 3 · Văn hóa', sc:'village', em:'😍', mood:'*ấn tượng thật*',
 txt:'Bạn nhận ra hết trang phục của người Mông — kể cả của bố mình nữa. Mình... thấy vui thật sự. Không phải ai cũng để ý vậy.',
 choices:[{t:'Vì mình muốn thật sự hiểu Mỷ — không chỉ nhìn bề ngoài rồi đi.', p:18, n:'c4_intro'},
          {t:'Trang phục người Mông đẹp thật sự — không khó để nhớ khi mình thích rồi.', p:12, n:'c4_intro'}]},

{id:'c3_tp_ok', chLabel:'Chương 3 · Văn hóa', sc:'village', em:'😊', mood:'*gật đầu*',
 txt:'Được rồi — gần đúng. Vài cái sai là chưa quen thôi. Mình sẽ kể thêm để bạn hiểu hơn.',
 choices:[{t:'Cảm ơn Mỷ không chê mình! Kể thêm cho mình nghe về ẩm thực đi — mình đang đói rồi.', p:8, n:'c4_intro'}]},

{id:'c3_tp_bad', chLabel:'Chương 3 · Văn hóa', sc:'village', em:'😄', mood:'*cười vui*',
 txt:'Haha! Người ngoài nhìn trang phục Mông đều bối rối hết — không sao. Để mình kể thêm cho.',
 choices:[{t:'Haha — kể thêm cho mình hiểu với, mình muốn học thêm!', p:5, n:'c4_intro'}]},

/* ═══ CHAPTER 4 ═══ */
{id:'c4_intro', chLabel:'Chương 4 · Ẩm thực', sc:'home', em:'😄', mood:'*xoa tay*',
 txt:'Nói nhiều chắc bạn đói rồi nhỉ? Để mình kể về đồ ăn người Mông — thú vị lắm đó!',
 choices:[{th:'Ọc ọc ọc',t:'Đói thật đấy Mỷ ơi! Kể mình nghe đi — món gì người Mông hay ăn nhất?', p:8, n:'c4_menmen', u:'menmen'},
          {t:'Mèn mén — mình nghe tên thấy lạ lắm, là món gì vậy Mỷ?', p:10, n:'c4_menmen', u:'menmen'}]},

{id:'c4_menmen', chLabel:'Chương 4 · Ẩm thực', sc:'home', em:'😊', mood:'',
 txt:'Mèn mén! Ngô xay nhỏ rồi đồ chín — thay cơm hàng ngày. Lần đầu ăn nhiều người thấy lạ, khô, không quen. Nhưng ăn với canh rau rừng hay thịt thì ngon lắm. Hàng ngày mình ăn vậy từ bé.',
 choices:[{t:'Còn món gì nữa không? Mình muốn nghe hết.', p:8, n:'c4_monkhac'},
          {th:'Muốn thử thật.',t:'Cách nấu mèn mén thế nào vậy? Có khó không?', p:6, n:'c4_cachnaau'}]},

{id:'c4_cachnaau', chLabel:'Chương 4 · Ẩm thực', sc:'home', em:'😌', mood:'',
 txt:'Ngô xay thô rồi cho vào chõ gỗ đồ hai lần — lần đầu đồ rồi lấy ra tơi cho ẩm, lần hai đồ chín hẳn. Cả nhà ngồi ăn cùng nhau. Mình biết nấu từ năm 12 tuổi — mẹ dạy.',
 choices:[{t:'Mỷ nấu được nhiều món không?', p:8, n:'c4_monkhac'}]},

{id:'c4_monkhac', chLabel:'Chương 4 · Ẩm thực', sc:'home', em:'😄', mood:'',
 txt:'Thắng cố! Ninh xương ngựa hay trâu trong nồi lớn — ăn ở chợ phiên. Lạ lắm nhưng ăn một lần là nhớ. Và lợn đen bản địa — nuôi thả trên núi, thịt chắc và thơm khác hẳn. Chỉ giết khi có đám cưới hay tết.',
 choices:[{t:'Tết người Mông khác gì tết người Kinh không?', p:10, n:'c4_tet', u:'tetmong'},
          {t:'Còn rượu — mình nghe nói rượu ngô người Mông nổi tiếng lắm đúng không?', p:8, n:'c4_ruou', u:'ruou'}]},

{id:'c4_ruou', chLabel:'Chương 4 · Ẩm thực', sc:'home', em:'😊', mood:'',
 txt:'Rượu ngô men lá rừng — trong vắt, ấm bụng. Khách đến nhà là mời rượu trước, ăn sau. Từ chối rượu là hơi thất lễ đó nhé! Bạn uống được không?',
 choices:[{t:'Uống được. Nhưng mình xin uống cẩn thận thôi — không dám uống nhiều.', p:8, n:'c4_ruou2'},
          {t:'Thành thật mà nói mình không uống rượu lắm. Có thể thay bằng nước chè được không?', p:5, n:'c4_che'}]},

{id:'c4_che', chLabel:'Chương 4 · Ẩm thực', sc:'home', em:'😄', mood:'*cười*',
 txt:'Haha được! Nước chè cũng ngon. Mẹ mình nấu chè gừng, uống buổi sáng ấm lắm. Mình sẽ bảo mẹ pha cho bạn. Nhưng sau này có chợ phiên thì phải uống một ly rượu đó — phong tục!',
 choices:[{th:'1 ly thì chắc ổn chứ?',t:'Được, mình đồng ý — một ly thôi nhé! Mà kể mình nghe về chợ phiên đi Mỷ ơi!', p:10, n:'c5_chophien', u:'chophien'}]},

{id:'c4_ruou2', chLabel:'Chương 4 · Ẩm thực', sc:'home', em:'😄', mood:'*tinh nghịch*',
 txt:'Cẩn thận thôi à! Rượu nhà mình 40 mấy độ đó. Uống một cốc là mặt đỏ liền — mình thấy nhiều khách vậy rồi. Haha! Bạn có chắc cẩn thận được không?',
 choices:[{th:'Chưa chắc lắm',t:'Mình chắc! Thử mới biết mà — sợ gì.', p:10, n:'c4_tet'},
          {t:'Haha thôi thôi — mình xin rút lui! Kể về lễ hội đi Mỷ, nghe hay hơn.', p:8, n:'c5_lehoi'}]},

{id:'c4_tet', chLabel:'Chương 4 · Ẩm thực', sc:'festival', em:'🥰', mood:'*sáng bừng*',
 txt:'Tết Mông tháng 11 âm lịch — trước tết người Kinh. Cả bản nghỉ ba ngày, không ai lên nương. Nhà nhà giết lợn, gói bánh giầy. Mình thích nhất đêm trước tết — cả nhà quây bếp, bố thổi khèn, mẹ kể chuyện cũ...',
 choices:[{th:'Wow',t:'Nghe ấm áp lắm. Mỷ có kỷ niệm tết nào nhớ nhất không?', p:12, n:'c4_tet2'},
          {t:'Kể tiếp đi Mỷ — hôm tết mọi người làm gì?', p:8, n:'c5_lehoi'}]},

{id:'c4_tet2', chLabel:'Chương 4 · Ẩm thực', sc:'festival', em:'😌', mood:'*nhớ lại*',
 txt:'Năm mình 10 tuổi — bố về từ nương lúc trời mưa, ướt hết. Mẹ la nhưng vẫn lấy khăn lau đầu cho bố. Mình ngồi nhìn và nghĩ: mình muốn có một gia đình như vậy. Vậy thôi mà nhớ mãi.',
 choices:[{t:'*Mình không nói gì được ngay — cảnh đó trong đầu đẹp quá.* Mỷ kể hay lắm. Cái cảnh đó... mình hiểu tại sao nhớ mãi.', p:15, n:'c5_lehoi'},
          {t:'Gia đình bình thường mà lại đẹp hơn nhiều thứ lớn lao khác. Mình nghĩ Mỷ hiểu điều đó rất sớm.', p:12, n:'c5_lehoi'}]},

/* ═══ CHAPTER 5 ═══ */
{id:'c5_lehoi', chLabel:'Chương 5 · Lễ hội', sc:'festival', em:'😍', mood:'*hào hứng*',
 txt:'Lễ hội! Chủ đề mình thích nhất! Có chợ phiên mỗi tuần và lễ hội lớn mỗi năm. Bạn muốn nghe cái nào?',
 choices:[{t:'Chợ phiên trước đi — Mỷ hay đi không?', p:8, n:'c5_chophien', u:'chophien'},
          {t:'Lễ hội lớn là lễ hội nào vậy Mỷ? Mình tò mò lắm.', p:10, n:'c5_chotinh'}]},

{id:'c5_chophien', chLabel:'Chương 5 · Lễ hội', sc:'market', em:'😄', mood:'*mắt sáng*',
 txt:'Mỗi chủ nhật! Người từ các bản xa đi bộ mấy tiếng để xuống. Không chỉ mua bán — gặp gỡ, kể chuyện, ăn thắng cố, hẹn hò nữa. Mình mặc váy đẹp nhất đi. Chủ nhật tới bạn còn ở đây không?',
 choices:[{t:'Còn! Mình muốn đi cùng Mỷ — nếu Mỷ không ngại dẫn theo?', p:15, n:'c5_cp2'},
          {t:'Hẹn hò ở chợ phiên — nghe lãng mạn lắm. Kể thêm cho mình nghe với!', p:10, n:'c5_tinh'}]},

{id:'c5_cp2', chLabel:'Chương 5 · Lễ hội', sc:'market', em:'🥰', mood:'*vui ra mặt*',
 txt:'Thật không? Vậy thì đến sớm nhé — 7 giờ sáng. Đông nhất lúc 8-9 giờ, nồi thắng cố bốc khói thơm lắm. Và bạn sẽ nghe tiếng khèn — mấy chàng trai hay thổi ở góc chợ.',
 choices:[{t:'Mấy chàng trai thổi khèn ở chợ để làm gì vậy?', p:10, n:'c5_tinh'},
          {th:'Gật đầu thật nhanh.',t:'Đúng 7 giờ — mình hứa. Mà Mỷ sẽ mặc váy đẹp nhất à?', p:12, n:'c5_chotinh'}]},

{id:'c5_tinh', chLabel:'Chương 5 · Lễ hội', sc:'festival', em:'😊', mood:'*hơi ngại*',
 txt:'Để... bày tỏ tình cảm. Chàng trai thổi đứng gần — cô gái thích thì ở lại, không thích thì đi. Không ai nói thẳng — nhạc nói thay. Lãng mạn không?',
 choices:[{t:'Lãng mạn lắm đó. Mỷ đã có ai thổi cho mình nghe chưa?', p:12, n:'c5_tinh2'},
          {t:'Còn chợ tình Khâu Vai — mình nghe tên mà không biết là gì. Kể mình nghe với?', p:10, n:'c5_chotinh', u:'chotinh'}]},

{id:'c5_tinh2', chLabel:'Chương 5 · Lễ hội', sc:'festival', em:'😌', mood:'*nhìn xoáy vào mắt bạn*',
 txt:'Lại hỏi chuyện đó! Có vài người thổi rồi. Nhưng mà... tai mình kén lắm. Chưa ai thổi đúng giai điệu mình muốn nghe. Bạn hỏi nhiều thế, định học thổi để dành cho ai à?',
 choices:[
   {th:'Cô ấy đang chủ động ném quả bóng sang sân mình.', t:'Nếu mình nói là mình muốn học để thổi cho Mỷ nghe thì sao? Vậy giai điệu Mỷ muốn nghe... rốt cuộc là như thế nào?', p:18, n:'c5_tinh3'},
   {th:'Đúng là một cô gái khó chinh phục.', t:'Tại sao chưa đúng giai điệu Mỷ muốn nhỉ — khó hơn mình nghĩ à?', p:15, n:'c5_tinh3'}
 ]},

{id:'c5_tinh3', chLabel:'Chương 5 · Lễ hội', sc:'festival', em:'😏', mood:'*bước lên một bước*',
 txt:'Không nói được. Kèn lá là để người ta tự cảm nhận. Thổi kèn lá thì dễ, nhưng người nào thực sự để tâm đến mình... tiếng nhạc tự nhiên sẽ khác. Bạn muốn thổi cho mình nghe à? Phải xem bạn có hiểu mình không đã.',
 choices:[
   {th:'Mình nhận ra cô ấy không đòi hỏi sự hoàn hảo, cô ấy đòi hỏi sự thấu hiểu.', t:'Mình hiểu. Mình không hứa sẽ thổi hay nhất, nhưng mình hứa tiếng nhạc đó sẽ chứa đựng tất cả sự tôn trọng và để tâm của mình dành cho Mỷ.', p:20, n:'c5_tinh4'},
   {th:'Điều này đòi hỏi sự chân thành sâu sắc hơn mình nghĩ.', t:'Đó là thứ chỉ người thật sự muốn nói điều gì đó mới thổi được. Mình sẽ ghi nhớ điều này.', p:15, n:'c5_tinh4'}
 ]},

{id:'c5_tinh4', chLabel:'Chương 5 · Lễ hội', sc:'festival', em:'😊', mood:'*cười che đi*',
 txt:'Bạn... nói hay đó. Thôi đi — còn chợ tình Khâu Vai nữa, kể không?',
 choices:[{t:'Kể đi Mỷ — mình đang nghe.', p:10, n:'c5_chotinh', u:'chotinh'}]},

{id:'c5_chotinh', chLabel:'Chương 5 · Lễ hội', sc:'festival', em:'😊', mood:'*giọng trầm*',
 txt:'Khâu Vai họp một năm một lần — 27 tháng 3 âm lịch. Nơi những người yêu cũ gặp lại. Người đã có gia đình cũng đến — ngồi kể chuyện xưa, không ai phán xét. Vừa buồn vừa đẹp.',
 choices:[{th:'...',t:'Mỷ nói đúng thật. Ông bà Mỷ có đến không?', p:8, n:'c5_khv2'},
          {t:'Mình hiểu tại sao Mỷ nói vừa buồn vừa đẹp. Mỷ còn điều gì muốn kể không?', p:5, n:'c6_intro'}]},

{id:'c5_khv2', chLabel:'Chương 5 · Lễ hội', sc:'festival', em:'😌', mood:'*nhìn xa*',
 txt:'Không biết. Người lớn không kể. Nhưng mình thấy mỗi năm bố hay nhìn về hướng Khâu Vai — không nói gì. Có lẽ ai cũng có câu chuyện riêng không nói ra.',
 choices:[{th:'...',t:'Cảm ơn Mỷ đã kể điều đó. Mình không ngờ câu chuyện lại sâu đến vậy.', p:15, n:'c6_intro'}]},

/* ═══ CHAPTER 6 ═══ */
{id:'c6_intro', chLabel:'Chương 6 · Tạm biệt', sc:'village', em:'🥰', mood:'*cười ấm*',
 txt:'Nói chuyện nhiều quá mà vẫn chưa hết! Trời sắp tối rồi. Bạn có chỗ ngủ chưa?',
 choices:[{t:'Thật ra... thì chưa. Mỷ có thể xin ngủ nhờ nhà Mỷ không — nếu không bất tiện?', p:15, n:'c6_ngu'},
          {t:'Có rồi Mỷ ơi — nhưng mình không muốn đi về. Nói chuyện với Mỷ hay lắm.', p:18, n:'c6_muon'}]},

{id:'c6_muon', chLabel:'Chương 6 · Tạm biệt', sc:'village', em:'😏', mood:'*cười mỉm*',
 txt:'Không muốn đi à? Biết ngay mà. Khách nào lên đây nói chuyện với mình xong cũng không nỡ về hết. Đùa thôi... ngủ lại nhà mình đi, mẹ mình rất thích có người dưới xuôi ở lại ăn cơm.',
 choices:[
   {th:'Cái cách cô ấy vừa kiêu ngạo vừa ấm áp thật sự làm mình đổ gục.', t:'Thật không? Cảm ơn nhé. Mình hứa sẽ là một vị khách ngoan, chỉ chiếm một góc nhà và mải mê ngắm Mỷ dệt vải thôi.', p:12, n:'c6_cuoi'}
 ]},
{id:'c6_ngu', chLabel:'Chương 6 · Tạm biệt', sc:'village', em:'😄', mood:'*xua tay*',
 txt:'Được chứ! Nhà mình có phòng khách. Mẹ thích có khách ngủ lại lắm — hôm sau bà hay nấu sáng thêm một phần. Ngày mai mình dẫn đi chợ phiên nhé?',
 choices:[{th:'Không ngờ mình được tiếp đón nồng nhiệt vậy.',t:' Dạ được ạ! Cảm ơn Mỷ và gia đình nhiều lắm — mình không ngờ được đón tiếp ấm áp vậy.', p:12, n:'c6_cuoi'}]},

{id:'c6_cuoi', chLabel:'Chương 6 · Tạm biệt', sc:'village', em:'🥰', mood:'*ánh mắt dịu dàng*',
 txt:'Để xem bạn có ngoan thật không. Hôm nay... mình rất vui vì gặp bạn. Lần sau lên Hà Giang, nhớ ghé bản mình. Mình sẽ kiểm tra xem bạn đã thổi kèn lá đúng bài chưa đấy nhé. 🌺',
 choices:[
   {th:'Hành trình này chỉ mới là bắt đầu.', t:'Nhất định sẽ quay lại. Mỷ chờ mình nhé.', p:10, n:'__END__'}
 ]},
{id:'__END__', chLabel:'Kết thúc', sc:'village', em:'🌺', mood:'*vẫy tay*',
 txt:'Hành trình cùng Mỷ đến đây kết thúc. Bạn đã tìm hiểu về cuộc sống, văn hóa, và trái tim của một cô gái người Mông ở Hà Giang.\n\nCảm ơn vì đã lắng nghe.',
 choices:[{t:'📚 Xem bộ sưu tập kiến thức', p:0, n:'__COLLECT__'},
          {t:'↩ Chơi lại từ đầu', p:0, n:'__RESTART__'}]},

].forEach(n => NODES[n.id] = n);