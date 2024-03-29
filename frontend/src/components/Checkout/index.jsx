import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Container,
  ListGroup,
  Form,
  Card,
  Modal,
} from "react-bootstrap";
export default function Checkout() {
  const { token, userId, cart, setCart, removeFromCart } =
    useContext(UserContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  let total = cart.reduce((acc, e, i) => {
    return (acc += e.price);
  }, 0);
  return (
    <div>
      <Container>
        <Card>
          <Card.Header>
            <strong>checkout</strong>
          </Card.Header>
          <Card.Body>
            <div className="row gy-4">
              <div className="col-md">
                {" "}
                <ListGroup>
                  <ListGroup.Item variant="secondary">
                    <strong>Cart</strong>
                  </ListGroup.Item>
                  {cart.map((product) => {
                    return (
                      <ListGroup.Item>
                        {product.label} <strong>{product.price}JD</strong>{" "}
                      </ListGroup.Item>
                    );
                  })}

                  <ListGroup.Item variant="secondary">
                    <strong>Total: {total} JD</strong>
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="col-md">
                <Card style={{ overflowY: "scroll", maxHeight: "500px" }}>
                  <Card.Header>
                    {" "}
                    <strong>Terms and Conditions of Service</strong>
                  </Card.Header>

                  <Card.Body>
                    <Card.Text style={{ padding: "10px", textAlign: "start" }}>
                      By accessing this website, you are agreeing to be bound by
                      these website Terms and Conditions of Service, the Privacy
                      Policy, all applicable laws and regulations, and agree
                      that you are responsible for compliance with any
                      applicable local laws. We may modify these Terms and
                      Conditions at any time without notice to you by posting
                      revised Terms and Conditions of Service. Your use of the
                      website constitutes your binding acceptance of these Terms
                      and Conditions of Service, including any modifications
                      that we make. If you do not agree with any of these terms,
                      you are prohibited from using or accessing this site. The
                      materials contained in this website are protected by
                      applicable copyright and trademark law. The Service
                      includes a combination of content that we create and that
                      other third party content suppliers create. You understand
                      that the Service are provided "AS IS", and that
                      Copyandpasteemoji.com does not guarantee the accuracy,
                      integrity or quality of any content available on the
                      website. Copyandpasteemoji.com disclaims all
                      responsibility and liability for the accuracy,
                      availability, timeliness, security or reliability of the
                      Service. We reserve the right to modify, suspend or
                      discontinue the Service with or without notice at any time
                      and without any liability to you. The Service is directed
                      to adults and is not directed to children under the age of
                      18. You must be 18 years of age or older to use the
                      Service. Access to Sites Copyandpasteemoji.com grants you
                      a limited license to access and use the website via Web
                      browsers or RSS readers only. You agree not to copy,
                      republish, frame, download, transmit, modify, rent, lease,
                      loan, sell, assign, distribute, license, sublicense,
                      reverse engineer, or create derivative works based on the
                      Content or Design of the website. In addition, you agree
                      not to use any data mining, robots, or similar data
                      gathering and extraction methods in connection with the
                      website. You further agree that you will not interfere
                      with another member's use and enjoyment of the Service;
                      you will not interfere with or disrupt the security
                      measures of the Service; you will not interfere with or
                      disrupt networks connected to the Service. Use License
                      Permission is granted to temporarily download one copy of
                      the materials (information or software) on
                      Copyandpasteemoji.com website for personal, non-commercial
                      transitory viewing only. This is the grant of a license,
                      not a transfer of title, and under this license you may
                      not: - modify or copy the materials; - use the materials
                      for any commercial purpose, or for any public display
                      (commercial or non-commercial); - attempt to decompile or
                      reverse engineer any software contained on
                      Copyandpasteemoji.com website; - remove any copyright or
                      other proprietary notations from the materials; or -
                      transfer the materials to another person or "mirror" the
                      materials on any other server; - transfer the materials to
                      another person or "mirror" the materials on any other
                      server; - access the site using automated means which may
                      degrade service for others. This license shall
                      automatically terminate if you violate any of these
                      restrictions and may be terminated by
                      Copyandpasteemoji.com at any time. Upon terminating your
                      viewing of these materials or upon the termination of this
                      license, you must destroy any downloaded materials in your
                      possession whether in electronic or printed format.
                      Conduct on Website and Contribution of Content Your use of
                      the Website is subject to all applicable laws and
                      regulations, and you are solely responsible for the
                      substance of your communications through the Website. By
                      posting information in or otherwise using any
                      communications service that may be available to you on or
                      through this Website, you agree that you will not upload,
                      share, post, or otherwise distribute or facilitate
                      distribution of any content (including text,
                      communications, data or other information) that: - is
                      known by you to be false, inaccurate or misleading; - is
                      for purposes of spamming; - is unlawful, obscene, vulgar,
                      shocking, excessive profanity, threatens or advocates for
                      harm on oneself or others, abusive, harassing, defamatory,
                      libelous, deceptive, fraudulent, invasive of another's
                      privacy, tortious, contains explicit or graphic
                      descriptions or accounts of sexual acts (including but not
                      limited to sexual language of a violent or threatening
                      nature directed at another individual or group of
                      individuals), pornographic, adult or mature, or otherwise
                      violates our rules or policies, profane or indecent
                      including any communication that constitutes (or
                      encourages conduct that would constitute) a criminal
                      offense, gives rise to civil liability or otherwise
                      violates any local, state or federal law, bullies,
                      victimizes, harasses, degrades, or intimidates an
                      individual or group of individuals; - is malware, adware,
                      hacking, cracking content, Illicit drugs and drug
                      paraphernalia content, or any other content that is
                      illegal, promotes illegal activity or infringes on the
                      legal rights of others; - contains links to software
                      viruses or any other computer code, files, or programs
                      itself that are designed or intended to disrupt, damage,
                      or limit the functioning of any software, hardware, or
                      telecommunications equipment or to damage or obtain
                      unauthorized access to any data or other information of
                      any third party; - impersonates any person or entity,
                      including any of our employees or representatives; - is
                      regarding programs which compensate users for clicking ads
                      or offers, performing searches, surfing websites or
                      reading emails; - claims the identity, characteristics or
                      qualifications of another person; - for which you were
                      compensated or granted any consideration by any third
                      party; - incites hatred against, promotes discrimination
                      of, or disparages an individual or group on the basis of
                      their race or ethnic origin, religion, disability, age,
                      nationality, veteran status, sexual orientation, gender,
                      gender identity, or other characteristic that is
                      associated with systemic discrimination or
                      marginalization; - infringes or violates on any patent,
                      trademark, trade secret, copyright, right of publicity,
                      other proprietary right of any party, or other
                      intellectual property rights; - promotes, sells, or
                      advertises tobacco or tobacco-related products, alcoholic
                      beverages, prescription drugs, weapons or ammunition
                      (e.g., firearms, firearm components, fighting knives, stun
                      guns), distribution of coursework or student essays,
                      products obtained from endangered or threatened species; -
                      constitutes unauthorized or unsolicited advertising, junk
                      or bulk email (also known as "spamming"), chain letters,
                      any other form of unauthorized solicitation, or any form
                      of lottery or gambling. We neither endorse nor assume any
                      liability for the contents of any material uploaded or
                      submitted by third party users of the Website. However, we
                      and our agents have the right at their sole discretion to
                      remove any content that, in our judgment, does not comply
                      with our Terms and Conditions of Service, Adsense program
                      policies, and any other rules of user conduct for our
                      Website, or is otherwise harmful, objectionable, or
                      inaccurate. In addition, you may not use the Service to
                      breach security or attempt to gain unauthorized access to
                      another network or server. Users who violate systems or
                      network security may incur criminal or civil liability.
                      Not all areas of the Website may be available to you or
                      other authorized users of the Website. Much of the content
                      of this Website is provided by and is the responsibility
                      of the person or people who made those postings. We do not
                      ensure the accuracy or legitimacy of any comments, remarks
                      or other information posted or generated by users of this
                      Website and, therefore, take no responsibility for such
                      content provided by users or other third parties. However,
                      we reserve the right to delete any content at any time
                      without notifying the person from which such content
                      originated. You hereby consent to such removal and waive
                      any claim against us arising out of such removal of
                      content. We are not responsible for any failure or delay
                      in removing content. Any failure by us to enforce or
                      exercise any provision of these Terms and Conditions of
                      Service or related rights shall not constitute a waiver of
                      that right or provision. Use of Materials and Proprietary
                      Rights Content displayed on or through the Service is
                      protected by copyright as a collective work and/or
                      compilation. Any reproduction or redistribution of the
                      site or the collective work is prohibited without the
                      express written consent of Copyandpasteemoji.com. By
                      posting Content to any public area of the Service, you
                      automatically grant, and you represent and warrant that
                      you have the right to grant, to Copyandpasteemoji.com an
                      irrevocable, perpetual, non-exclusive, fully paid,
                      worldwide license to use, copy, perform, display, and
                      distribute said Content and to prepare derivative works
                      of, or incorporate into other works, said Content, and to
                      grant and authorize sublicenses of the foregoing. Subject
                      to our Privacy Policy, any communication or material that
                      you transmit to this site or to us, whether by electronic
                      mail, post, or other means, for any reason, will be
                      treated as non-confidential and non-proprietary. Please do
                      not submit confidential or proprietary information to us
                      unless we have mutually agreed in writing otherwise. We
                      are also unable to accept your unsolicited ideas or
                      proposals, so please do not submit them to us in any
                      circumstance. By posting your content using the website,
                      you are granting an unrestricted, irrevocable,
                      non-exclusive, royalty-free, perpetual, worldwide, and
                      fully transferable, assignable, and sublicensable right
                      and license to use, copy, reproduce, modify, adapt,
                      publish, translate, create collective or derivative works
                      from, distribute, perform and display your content in
                      whole or in part and to incorporate it in other works in
                      any form, media, or technology now known or later
                      developed. You further warrant that all so-called moral
                      rights in the content have been waived. By posting content
                      to the website, you warrant and represent that you either
                      own or otherwise control all of the rights to that
                      content, including, without limitation, all the rights
                      necessary for you to provide, post, upload, input or
                      submit the content, or that your use of the content is a
                      protected fair use. You agree that you will not knowingly
                      provide material and misleading false information. You
                      represent and warrant also that the content you supply
                      does not violate these Terms. It is your sole
                      responsibility to ensure that your postings do not
                      disclose confidential and/or proprietary information,
                      including personal financial information, information
                      covered by a nondisclosure agreement, and information that
                      you are not authorized to disclose. We caution you not to
                      disclose personal information about yourself or your
                      children, such as social security numbers, credit card
                      numbers, etc. You agree to indemnify and hold Us and Our
                      affiliated companies, and their directors, officers and
                      employees, harmless for any and all claims or demands,
                      including reasonable attorney fees, that arise from or
                      otherwise relate to your use of the website, any content
                      you supply to the website, or your violation of these
                      Terms or the rights of another. Security and Password You
                      are solely responsible for maintaining the confidentiality
                      of your password and account and for any and all
                      statements made and acts or omissions that occur through
                      the use of your password and account. Therefore, you must
                      take steps to ensure that others do not gain access to
                      your password and account. Our personnel will never ask
                      you for your password. You may not transfer or share your
                      account with anyone, and we reserve the right to
                      immediately terminate your account if you do transfer or
                      share your account. You agree to be responsible for any
                      action that occurs as the result of any access to your
                      account as the result of access with your password. You
                      agree that if it is determine that your password has been
                      compromised that your account may be closed or access to
                      the account may be terminated with no obligation to keep
                      or maintain the information or data in your account.
                      Termination of Use You agree that we may, in our sole
                      discretion, terminate or suspend your access to all or
                      part of the site with or without notice and for any
                      reason, including, without limitation, breach of these
                      Terms of Use. Any suspected fraudulent, abusive or illegal
                      activity may be grounds for terminating your relationship
                      and may be referred to appropriate law enforcement
                      authorities. Upon termination or suspension, regardless of
                      the reasons therefore, your right to use the services
                      available on this site immediately ceases, and you
                      acknowledge and agree that we may immediately deactivate
                      or delete your account and all related information and
                      files in your account and/or bar any further access to
                      such files or this site. We shall not be liable to you or
                      any third party for any claims or damages arising out of
                      any termination or suspension or any other actions taken
                      by us in connection with such termination or suspension.
                      Warranties The materials and all information on
                      Copyandpasteemoji.com website are provided "as is".
                      Copyandpasteemoji.com makes no warranties, expressed or
                      implied, and hereby disclaims and negates all other
                      warranties, including without limitation, implied
                      warranties or conditions of merchantability, fitness for a
                      particular purpose, or non-infringement of intellectual
                      property or other violation of rights. The materials
                      appearing on Copyandpasteemoji.com website could include
                      technical, typographical, or photographic errors.
                      Copyandpasteemoji.com does not warrant that any of the
                      materials on its website are accurate, complete, or
                      current. Copyandpasteemoji.com may make changes to the
                      materials contained on its website at any time without
                      notice. Copyandpasteemoji.com does not, however, make any
                      commitment to update the materials. Copyandpasteemoji.com
                      does not warrant that the servers this website is hosting
                      on will be will be constantly available, or available at
                      all. Copyandpasteemoji.com does not warrant that the
                      information on this website is complete, true, accurate or
                      non-misleading. Nothing on this website should be taken to
                      construe or constitute advice of any kind or a formal
                      recommendation and we exclude all representations and
                      warranties relating to this site's content and use. If you
                      require advice relating to any medical, financial or legal
                      matter, you should consult with an appropriate
                      professional. Links to other Websites and Advertisement
                      This website includes links to third party sites. You
                      acknowledge and agree that Copyandpasteemoji.com is not
                      responsible for the availability of such external sites or
                      resources, and does not endorse and is not responsible or
                      liable for any content, advertising, products, or other
                      materials available from such sites or resources.
                      Copyandpasteemoji.com takes no responsibility for third
                      party advertisements which are posted on the website, nor
                      does it take any responsibility for the products or
                      services provided by its advertisers.
                      Copyandpasteemoji.com has not reviewed all of the sites
                      linking to or linked to from the website and is not
                      responsible for the contents of any such linked site. The
                      inclusion of any link does not imply endorsement by
                      Copyandpasteemoji.com of the site. Use of any such linked
                      website is at the user's own risk. Liability In no event,
                      will Copyandpasteemoji.com be liable for any damages of
                      any kind, including, without limitation, those relating to
                      business losses, business interruption, loss of profit,
                      loss of contracts, loss of goodwill, loss or corruption of
                      data, or anticipated losses arising out of connection with
                      the use or inability to use the materials on
                      Copyandpasteemoji.com or any linked websites, even if
                      Copyandpasteemoji.com or a Copyandpasteemoji.com
                      authorized representative has been notified orally or in
                      writing of the possibility of such damage. In addition to
                      any excuse provided by applicable law, we shall be excused
                      from liability for non-delivery or delay in delivery of
                      products and services available through our site arising
                      from any event beyond our reasonable control, whether or
                      not foreseeable by either party, including but not limited
                      to, labor disturbance, war, fire, accident, adverse
                      weather, inability to secure transportation, governmental
                      act or regulation, and other causes or events beyond our
                      reasonable control, whether or not similar to those which
                      are enumerated above. Disclaimer of Warranties
                      Copyandpasteemoji.com disclaims any and all responsibility
                      or liability for the accuracy, content, completeness,
                      legality, reliability, or operability or availability of
                      information or Content displayed on the website. ALL
                      CONTENT IS PROVIDED ON AN "AS IS" BASIS WITHOUT ANY
                      WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMMPLIED. YOU
                      AGREE THAT YOUR USE OF THIS SERVICE IS ENTIRELY AT YOUR
                      OWN RISK. UNDER NO CIRCUMSTANCES WILL
                      Copyandpasteemoji.com BE LIABLE TO YOU FOR ANY DIRECT,
                      INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES
                      ARISING OUT OF OR IN CONNECTION WITH USE OF THE SERVICE,
                      EVEN IF Copyandpasteemoji.com HAS PREVIOUSLY BEEN ADVISED
                      OF, OR REASONABLY COULD HAVE FORESEEN, THE POSSIBILITY OF
                      SUCH DAMAGES. User Privacy For a description of how
                      Copyandpasteemoji.com maintains the personal information
                      you provide, please see Privacy Policy. Other parties You
                      accept that, as a limited liability entity,
                      Copyandpasteemoji.com has an interest in limiting the
                      personal liability of its employees and officers. You
                      agree that you will not bring any claim, in respect to any
                      losses you suffer in connection with this website,
                      personally against the employees and officers of
                      Copyandpasteemoji.com. Without prejudice to the foregoing
                      paragraph, you agree that the limitations of warranties
                      and liability set out in this website disclaimer will
                      protect Copyandpasteemoji.com's employees, officers,
                      agents, subsidiaries, and sub-contractors as well as
                      Copyandpasteemoji.com. Indemnification You agree to hold
                      harmless and indemnify Copyandpasteemoji.com, and its
                      subsidiaries, affiliates, officers, agents, and employees
                      from and against any third-party claim arising from or in
                      any way related to your use of the Service, including any
                      liability or expense arising from all claims, losses,
                      damages (actual and consequential), suits, judgments,
                      litigation costs and attorneys' fees, of every kind and
                      nature. Unenforceable provisions If any part of these
                      Terms of Use is held invalid or unenforceable, that
                      portion shall be construed in a manner consistent with
                      applicable law to reflect, as nearly as possible, the
                      original intentions of the parties, and the remaining
                      portions shall remain in full force and effect. Policy
                      Modifications Copyandpasteemoji.com may revise these Terms
                      and Conditions of Service or Privacy Policy for its
                      website at any time without notice. Any revised version
                      will be deemed applicable when published on this website.
                      Termination Copyandpasteemoji.com reserves the right to
                      immediately terminate your use of, or access to the
                      Service if Copyandpasteemoji.com decides at its sole
                      discretion that you have breached this Agreement or any
                      relevant law, rule or regulation or you have engaged in
                      conduct that we consider to be inappropriate or
                      unacceptable. Location The Site and the Service are
                      operated by Copyandpasteemoji.com in the British Virgin
                      Islands. Those who choose to access the Site, and/or the
                      Service from locations outside the British Virgin Islands
                      do so on their own initiative and are responsible for
                      compliance with applicable local laws. Governing Law This
                      Terms of Use is governed by, and will be construed under,
                      the laws of Lithuania, without regard to conflict of law
                      principles. The application of the United Nations
                      Convention on Contracts for the International Sale of
                      Goods is expressly excluded. In any action to enforce
                      these Terms of Use, the prevailing party will be entitled
                      to costs and attorneys' fees. Any cause of action brought
                      by you against us or our Affiliates must be instituted
                      with one year after the cause of action arises or be
                      deemed forever waived and barred. All disputes arising out
                      of or related to your use of the Site and/or the Service
                      shall be subject to the exclusive jurisdiction of the
                      state and federal courts located within Lithuania and you
                      agree to submit to the personal jurisdiction and venue of
                      such courts. If either you or commences a lawsuit for a
                      dispute arising under this Terms of Use or relating to the
                      Site and/or the Service, all of the issues in such action,
                      whether of fact or law, shall be submitted to general
                      judicial reference pursuant to Lithuania Code of Civil
                      Procedure. Removing your Personal Information from
                      Copyandpasteemoji.com If you want to remove your
                      information from the Copyandpasteemoji.com phone
                      directory, please contact us via Contact Us page. Your
                      information will be removed from our system as soon as is
                      reasonably possible.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "10px",
                  padding: "10px",
                }}
              >
                {" "}
                <Button
                  onClick={(e) => {
                    axios
                      .post(
                        `http://localhost:5000/order`,
                        {
                          user: userId,
                          orders: cart.map((e) => e._id),
                          total: total,
                          paymentMethod: "cash",
                          shipping: false,
                          successfulPayment: false,
                        },
                        { headers: { Authorization: `Bearer ${token}` } }
                      )
                      .then(() => {
                        handleShow();
                      })
                      .catch((error) =>
                        console.log(error.response.data.message)
                      );
                  }}
                  variant="warning"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
        <>
          <Modal backdrop="static" show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>B store</Modal.Title>
            </Modal.Header>
            <Modal.Body>Order sent successfully</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={(e) => {
                  handleClose();
                  setCart([]);
                  navigate("/");
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Container>
    </div>
  );
}

{
  /* <div>
<h3>Choose your Payment Method</h3>
</div>
<div
style={{
  display: "flex",
  justifyContent: "space-around",
  margin: "10px",
  padding: "10px",
}}
>
{" "}
<Button
  onClick={(e) => {
    axios
      .post(
        `http://localhost:5000/order`,
        {
          user: userId,
          orders: cart.map((e) => e._id),
          total: total,
          paymentMethod: "cash",
          shipping: false,
          successfulPayment: false,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        handleShow();
      })
      .catch((error) =>
        console.log(error.response.data.message)
      );
  }}
  variant="warning"
>
  Cash On Delivery
</Button>
<Button>Pay Online</Button>
</div> */
}
