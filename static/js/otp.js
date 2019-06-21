$(".otp-digit").keyup(function () {
    console.log('hey')
    if (this.value.length == this.maxLength) {
      $(this).next('.otp-digit').focus();
    }
});
