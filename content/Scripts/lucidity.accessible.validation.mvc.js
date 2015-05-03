$(document).ready(function () {
    var initializeValidationErrorLinks = function () {
        $('.validation-error-link').click(function (e) {
            e.preventDefault();
            var href = $(this).attr("href");
            var invalidControl = $(href);

            if (invalidControl.hasClass("ic-datepicker-validator")) {
                invalidControl = invalidControl.parent().find("date-picker-day");
            }

            var scrollPos = invalidControl.offset().top;
            $(window).scrollTop(scrollPos);
            invalidControl.focus();
        });
    };

    $("form").bind("invalid-form.validate", function (form, validator) {

        var container = $(this).find("[data-valmsg-summary=true]"),
            list = container.find("ul");

        if (list && list.length && validator.errorList.length) {
            list.empty();
            container.addClass("validation-summary-errors").removeClass("validation-summary-valid");

            $.each(validator.errorList, function () {
                var anchor = $("<a/>");
                anchor.html(this.message);
                anchor.attr("href", "#" + this.element.id);
                anchor.addClass("validation-error-link");

                $("<li />").html(anchor).appendTo(list);
            });
        }

        var errorDiv = $(this).find(".validation-summary-errors").first();
        $("#errors").text("There were some problems with the information you entered, please correct and resubmit.");

        //Visually move screen to top of validation summary div.
        var scrollPos = errorDiv.offset().top;
        $(window).scrollTop(scrollPos);

        $("span[data-valmsg-for]").removeAttr("role");

        validator.focusInvalid = function () {
            return errorDiv.focus();
        };

        initializeValidationErrorLinks();
    });
});