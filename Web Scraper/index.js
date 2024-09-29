var axios = require("axios").default;
const fs = require("fs");
const json2xls = require("json2xls");
const filename = "JobList_data.xlsx";

async function getJobs() {
  finalResult = [];
  for (let i = 1; i < 400; i++) {
    var options = {
      method: "POST",
      url: "https://www.stepstone.de/public-api/resultlist/unifiedResultlist",
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        cookie:
          "STEPSTONEV5LANG=de; VISITOR_ID=913b4061aa9adc6a464936ef080348bd; _abck=6499BD8FF35B9119E24CBA4F6FBC8498~-1~YAAQtO8ZuNbHzNyOAQAAytgY4QtyYrIdwd29QkdzFkMrKFaThuh0LD8SezIwWBk64i8oSkcCSNYFcfgai6eh9WyAvdzQgl/lIFpvkdI2eS4SkGJoRZ4LjXg427P0Cyj3Wib6sxNvyboRt4CKg6L/zSm4EpAb/vhY7+W8KtabZFTsPkEWW36svkfArb1n+tKQzcypYbRUItQnBu65gKPHw5vZWWN/3YjY6TCsdRAj2LrgInaIu4dKPghAYnSxsuWHWox8MM7OAJ8dW3+J6lWBp8devSdYm7RrSpiDT+p0xUU2jpgmd0nVOFkIUfm91Q5qj/a1LEbPoh9faL2wCwWP6sFR8NPfWqZ4HoJAwSbL2qd+OfFPHmwW6xVfTyEN8w==~-1~-1~-1; s_vi=[CS]v1|865efd32cc1661ff-851e81fc8f98ecd3[CE]; s_fid=865efd32cc1661ff-851e81fc8f98ecd3; cfid=268d84af-b729-4e95-839d-e9ba4b978e3d; cftoken=0; USER_HASH_ID=e79c7cae-ba0e-42c0-8b22-40aa6a144624; V5=1; UXUSER=%20%3B%20%3B%20%3B; X-AUTH-CSRF-TOKEN=tng8iudlttp2wh7bi8yq0c43ijccovw1qv61tw36; ONLINE_CF=10.146.2.111; __Host-X-PROFILE-CSRF-SECRET=lsRPMhi7Biw_alcgW2EelpnP; __Host-X-PROFILE-CSRF-TOKEN=P3U2WvbI-w3wCAOXnU8njmjQh4hocuglMj3c; gclid=CjwKCAjwoPOwBhAeEiwAJuXRh2g4KTR_zYm-e_BDd3jh9hjVQ5U8exRrCk9tbMe8q0dxkjfiT9tL6hoC4EYQAvD_BwE; CONSENTMGR=c1:1%7Cc2:1%7Cc3:1%7Cc4:1%7Cc5:0%7Cc6:1%7Cc7:1%7Cc8:0%7Cc9:1%7Cc10:0%7Cc11:0%7Cc12:1%7Cc13:1%7Cc14:0%7Cc15:0%7Cts:1713173496384%7Cconsent:true; trackingCode=SEA_GO_DE-DE-GEN-PMAX--|[geoC]_c_PMAX_PMAX_FP_PMAX001; _gcl_au=1.1.764019235.1713173497; _scid=7c0d81f2-8b98-4c3b-902e-d4ef902f86ab; _ga=GA1.1.449205196.1713173497; _pk_ref.1165.b765=%5B%22%22%2C%22%22%2C1713173498%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D; _pk_ses.1165.b765=1; _hjSessionUser_2060800=eyJpZCI6IjAyMGEyOTcxLTczMjktNWVkMC05YTc4LTQ0ODEwZDc5ZTlmYiIsImNyZWF0ZWQiOjE3MTMxNzM0OTc4MjgsImV4aXN0aW5nIjp0cnVlfQ==; _hjSession_2060800=eyJpZCI6Ijc4NjZmNGE5LTE4YjgtNDE4Mi1iMTBiLTE0OWUyYWZhODkzYyIsImMiOjE3MTMxNzM0OTc4MzIsInMiOjEsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjoxLCJzcCI6MH0=; _hjHasCachedUserAttributes=true; _tt_enable_cookie=1; _ttp=9xtu-RqjXRgyfs76smpxDXpefTk; _clck=1jqzs9r%7C2%7Cfky%7C0%7C1566; searchAssistant=1713173506621-v1; s_cc=true; _gcl_aw=GCL.1713173528.CjwKCAjwoPOwBhAeEiwAJuXRh2g4KTR_zYm-e_BDd3jh9hjVQ5U8exRrCk9tbMe8q0dxkjfiT9tL6hoC4EYQAvD_BwE; searchAssistantAnswers=%7B%22answers%22%3A%7B%22where%22%3A%5B%5D%2C%22remote%22%3Afalse%2C%22what%22%3A%5B%5D%7D%2C%22searchAssistantCompleted%22%3Atrue%2C%22profileUpdated%22%3Afalse%7D; bm_sz=68F5E25B766027429D24C88A9C33890B~YAAQtO8ZuCXTzNyOAQAA/XwZ4Rf+5NAjiUwpw6+SP6rvR7GOuBLB94VbibJ3aaZe8QLbPqnTypbliTMLH5OEtbuRmxrZS4TgfDfPrddUOHpNWQAEdEWuDWfP72Zqx7yIsKMDyqrOoHsuyK1CE2w7TtH0ofpbnzXX/CqM5HwHHf8DFwiks3FZNe3NR/hOLFzVVvlitBfQvBn3ckWN9TzuPlhlrwCDmKeQtCvyRirJ8DiMeofiSKmgdzFecMH5r3XN4hbfuzohkTvjD1HWxohVnh5+3CrQYNaxngngVP/O2SIZCwyBm9GR4wpWf0jgN5juaWonYCpQQwFz2IayX+dEq3NpcOCx0jZo7aAxzL5i/rjYraLqbmBcpcOr08PJGGwPFumoYFOF300ih/yOgqQ7~3359027~3748915; EntryUrl=/jobs/?action=facet_selected; _scid_r=7c0d81f2-8b98-4c3b-902e-d4ef902f86ab; _pk_id.1165.b765=9377c95e1ea75cd7.1713173498.1.1713173536.1713173498.; _uetsid=f4974530fb0a11eeb82b150771b56620; _uetvid=e918e9701aaa11eeb237815105cdad3f; cto_bundle=EKiiR19XcG00ckNiVjJhWlhZMTBZWEo4cW9pJTJCQ2E1dHNMbnpUa1VINFRFem5BWiUyRiUyQnVjTVBZbHk3ZVowS05JJTJGTmpKayUyRmJXZXBnNFZPN2tNcGhBdEw4SVhObCUyRnI3dDJrNXI4dHdGSmx0b1pHcEVINXFCZ2xTbXhNbXFwSFViMXpZRWx2WncxV2hrd0tIQ05TcHQlMkZ5REh0V2gwZmtGQWdHJTJGcU0lMkJRSlFUTnZVUzAzZVB4ZjJ1WEdRYUZvQW5oTWljT1ROS1ByQjJvWXQ2MWMlMkZqb3F1Z3cyTWluJTJCM0JpREN3MUNmZkp6OVNhUXlVUDhzSWwxUUhESm9nOXpXY3A3YjcxRUZGTklEMDhNaEpnTGUxNUFFMCUyRmFXcndrZyUzRCUzRA; QSI_HistorySession=https%3A%2F%2Fwww.stepstone.de%2F%3Fgclid%3DCjwKCAjwoPOwBhAeEiwAJuXRh2g4KTR_zYm-e_BDd3jh9hjVQ5U8exRrCk9tbMe8q0dxkjfiT9tL6hoC4EYQAvD_BwE%26ef_id%3DCjwKCAjwoPOwBhAeEiwAJuXRh2g4KTR_zYm-e_BDd3jh9hjVQ5U8exRrCk9tbMe8q0dxkjfiT9tL6hoC4EYQAvD_BwE%3AG%3As%26cid%3DSEA_GO_DE-DE-GEN-PMAX--%257C%255BgeoC%255D_c_PMAX_PMAX_FP_PMAX001%26loc_interest%3D9043160%26loc_physical%3D9043145%26s_kwcid%3DAL\u0021523\u00213\u0021\u0021\u0021\u0021x\u0021\u0021\u002121079543344\u0021%26gad_source%3D1~1713173498230%7Chttps%3A%2F%2Fwww.stepstone.de%2Fjobs%2F%3Faction%3Dfacet_selected~1713173541323; utag_main=v_id:018ee118e3920013c25f1324ad6f0506f017d06700978$_sn:1$_se:21$_ss:0$_st:1713175548964$ses_id:1713173488534%3Bexp-session$_pn:2%3Bexp-session$qvPageNumber:0%3Bexp-session$qvPreviousUrl:https%3A%2F%2Fwww.stepstone.de%2F%3Bexp-session$qvTriggered:true%3Bexp-session$dc_visit:1$dc_event:17%3Bexp-session$dc_region:eu-central-1%3Bexp-session$prev_p:Resultlist%20Responsive%3Bexp-session$vpn:ext$vapi_domain:stepstone.de; _ga_SD0P3FB7K9=GS1.1.1713173488534.1.1.1713173750.59.0.0; _clsk=z6mzgs%7C1713173750999%7C5%7C0%7Cb.clarity.ms%2Fcollect; _dd_s=rum=0&expire=1713174665982; s_sq=stepstone-development-test-5%3D%2526c.%2526a.%2526activitymap.%2526page%253Dhttps%25253A%25252F%25252Fwww.stepstone.de%25252Fjobs%25252F%25253Faction%25253Dfacet_selected%2526link%253D2%2526region%253Dstepstone-pagination-res386%2526.activitymap%2526.a%2526.c%2526pid%253Dhttps%25253A%25252F%25252Fwww.stepstone.de%25252Fjobs%25252F%25253Faction%25253Dfacet_selected%2526oid%253Dhttps%25253A%25252F%25252Fwww.stepstone.de%25252Fjobs%25253Fpage%25253D2%252526wfh%25253D1%252526wfh%25253D2%252526searl%25253Dtrue%2526ot%253DA%26stepstone-de-core-v5%3D%2526c.%2526a.%2526activitymap.%2526page%253Dhttps%25253A%25252F%25252Fwww.stepstone.de%25252F%25253Fgclid%25253DCjwKCAjwoPOwBhAeEiwAJuXRh2g4KTR_zYm-e_BDd3jh9hjVQ5U8exRrCk9tbMe8q0dxkjfiT9tL6hoC4EYQAvD_BwE%252526ef_id%25253DCjwKCAjwoPOwBhAeEiwAJuXRh2g4KTR_zYm-e_BDd3jh9hjVQ5U8exRrCk9tbMe8q0dxkjfiT9tL6hoC4EYQAvD_BwE%25253AG%25253As%252526cid%25253DSEA_GO_DE-DE-GEN-PMAX--%2525257%2526link%253DSkip%2526region%253Dsearch-assistant-dialog%2526.activitymap%2526.a%2526.c%2526pid%253Dhttps%25253A%25252F%25252Fwww.stepstone.de%25252F%25253Fgclid%25253DCjwKCAjwoPOwBhAeEiwAJuXRh2g4KTR_zYm-e_BDd3jh9hjVQ5U8exRrCk9tbMe8q0dxkjfiT9tL6hoC4EYQAvD_BwE%252526ef_id%25253DCjwKCAjwoPOwBhAeEiwAJuXRh2g4KTR_zYm-e_BDd3jh9hjVQ5U8exRrCk9tbMe8q0dxkjfiT9tL6hoC4EYQAvD_BwE%25253AG%25253As%252526cid%25253DSEA_GO_DE-DE-GEN-PMAX--%2525257%2526oid%253DfunctionVn%252528%252529%25257B%25257D%2526oidt%253D2%2526ot%253DBUTTON",
        origin: "https://www.stepstone.de",
        referer: "https://www.stepstone.de/jobs?page=1&wfh=1&wfh=2&searl=true",
        "sec-ch-ua":
          '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
      data: {
        url:
          "https://www.stepstone.de/jobs?page=" +
          i +
          "&of50&wfh1&wfh2&searltrue",
        lang: "de",
        siteId: 250,
        userData: {
          isUserLoggedIn: false,
          candidateId: "",
          userHashId: "e79c7cae-ba0e-42c0-8b22-40aa6a144624",
        },
        isNonEUUser: false,
        isBotCrawler: false,
        uiLanguage: "de",
        fields: ["items", "pagination", "unifiedPagination"],
      },
    };

    await axios
      .request(options)
      .then(function (response) {
        let data = response.data.items;
        data.forEach((element) => {
          finalResult.push(element);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  var xls = json2xls(finalResult);
  fs.writeFileSync(filename, xls, "binary", (err) => {
    if (err) {
      console.log("writeFileSync error :", err);
    }
    console.log("The file has been saved!");
  });
}

getJobs();
