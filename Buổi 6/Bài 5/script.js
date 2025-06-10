$(document).ready(function () {
  $('#muavao').focus(); // 1) Khi trang load, focus vào ô mua vào
  $('#state').prop('disabled', true); // và nút State bị disable

  $('#muavao').blur(function () {
    const val = $(this).val();
    if (!isNaN(val) && val.trim() !== "") {
      $('#state').prop('disabled', false); // 2) Hợp lệ thì enable nút State
    } else {
      $('#state').prop('disabled', true);
    }
  });

  $('#loaixe').change(function () {
    const value = $(this).val();
    if (value) {
      const [img, price] = value.split(';');
      $('#car-image').attr('src', img);
      $('#car-price').text(`Giá: ${price} USD`);
    } else {
      $('#car-image').attr('src', '');
      $('#car-price').text('Giá: ');
    }
  });

  $('#update').click(function () {
    const mua = $('#muavao').val();
    const ban = $('#banra').val();
    const type = $('input[name="type"]:checked').val();

    if (type === "1") {
      $('#vang-mua').text(mua);
      $('#vang-ban').text(ban);
    } else if (type === "0") {
      $('#usd-mua').text(mua);
      $('#usd-ban').text(ban);
    } else {
      alert("Vui lòng chọn loại cập nhật (Vàng/USD)");
    }
  });
});
