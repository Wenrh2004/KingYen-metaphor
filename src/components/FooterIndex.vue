<template>
    <div class="footer-index">
        <div class="footer-inner">
            <div class="foot-left">
                <div class="logo">
                    <img src="@/assets/images/yksg.svg" class="logo-img">
                    <p class="logo-name">King Yen</p>
                </div>
                <p class="top-p">King Yen</p>
                <p class="top-p">@A rabbit from France.</p>
                <p class="state"><span>声明</span><span>Developer Team from QIT Software Studio</span></p>
            </div>
            <div class="link">
                <p class="title">链接</p>
                <div class="line-inner">
                    <a href="https://github.com/Wenrh2004" target="_blank" class="link-name">个人GitHub</a>
                    <a href="https://github.com/orgs/QIT-DeveloperTeam/dashboard" target="_blank"
                        class="link-name">团队GitHub</a>
                </div>
            </div>
            <div class="foot-right">
                <p class="title">赞助</p>
                <div class="right-inner">
                    <div>
                        <img src="@/assets/images/IMG_6429.png">
                        <p class="pay-title">微信支付</p>
                    </div>
                    <div>
                        <img src="@/assets/images/IMG_6429.png">
                        <p class="pay-title">支付宝支付</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.footer-index {
    width: 100%;
    height: 200px;
    background: @gray-10;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 40px;
}

.footer-inner {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    p {
        color: rgba(255, 255, 255, 0.5);
    }


    .foot-left {
        .logo {
            display: flex;
            align-items: center;
            margin-bottom: 24px;

            .logo-name {
                font-size: 20px;
                color: @gray-0;
                font-weight: 600;
                padding-left: 10px;
            }

            .top-p {
                font-size: 12px;
                padding-bottom: 4px;
                width: 400px;
            }

            .state {
                font-size: @font-size-12;
                padding-top: 26px;

                span {
                    padding-right: 20px;
                }
            }
        }
    }

    .title {
        width: 32px;
        height: 22px;
        font-size: 16px;
        padding-bottom: 12px;
    }

    .link {
        padding-left: 40 40px;
        flex: 1;

        .line-inner {
            a {
                color: rgba(255, 255, 255, 0.5);
                padding-right: 20px;
            }
        }
    }

    .foot-right {
        .right-inner {
            display: flex;

            img{
                width: 100px;
                padding-right: 40px;
            }

            .pay-title {
                font-size: 12px;
                padding-top: 8px;
            }
        }
    }
}
</style>