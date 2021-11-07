import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import {
  // EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  // InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  // LivejournalShareButton,
  // MailruShareButton,
  // OKShareButton,
  // PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  // TelegramShareButton,
  // TumblrShareButton,
  TwitterShareButton,
  // ViberShareButton,
  // VKShareButton,
  WeiboShareButton
  // WhatsappShareButton,
  // WorkplaceShareButton
} from 'react-share'

import {
  // EmailIcon,
  FacebookIcon,
  // FacebookMessengerIcon,
  HatenaIcon,
  // InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  // LivejournalIcon,
  // MailruIcon,
  // OKIcon,
  // PinterestIcon,
  PocketIcon,
  RedditIcon,
  // TelegramIcon,
  // TumblrIcon,
  TwitterIcon,
  // ViberIcon,
  // VKIcon,
  WeiboIcon
  // WhatsappIcon,
  // WorkplaceIcon
} from 'react-share'

const commonOption = {
  size: 32,
  borderRadius: 4
}

const Twitter: React.FC<{ url: string }> = ({ url }) => {
  return (
    <TwitterShareButton
      url={url}
      title='Check My JSON Typed Definition | JTDV'
      via='Ningensei848'
      hashtags={['JSONTypedDefinition', 'JTDV']}
    >
      <Tooltip title='Twitter'>
        <IconButton>
          <TwitterIcon {...commonOption} />
        </IconButton>
      </Tooltip>
    </TwitterShareButton>
  )
}

const LINE: React.FC<{ url: string }> = ({ url }) => {
  return (
    <LineShareButton url={url} title='Check My JSON Typed Definition | JTDV'>
      <Tooltip title='LINE'>
        <IconButton>
          <LineIcon {...commonOption} />
        </IconButton>
      </Tooltip>
    </LineShareButton>
  )
}

const FaceBook: React.FC<{ url: string }> = ({ url }) => {
  return (
    <FacebookShareButton url={url} quote='Check My JSON Typed Definition | JTDV'>
      <Tooltip title='FaceBook'>
        <IconButton>
          <FacebookIcon {...commonOption} />
        </IconButton>
      </Tooltip>
    </FacebookShareButton>
  )
}

const Weibo: React.FC<{ url: string }> = ({ url }) => {
  return (
    <WeiboShareButton url={url} title='Check My JSON Typed Definition | JTDV'>
      <Tooltip title='Weibo'>
        <IconButton>
          <WeiboIcon {...commonOption} />
        </IconButton>
      </Tooltip>
    </WeiboShareButton>
  )
}

const Reddit: React.FC<{ url: string }> = ({ url }) => {
  return (
    <RedditShareButton url={url} title='Check My JSON Typed Definition | JTDV'>
      <Tooltip title='Reddit'>
        <IconButton>
          <RedditIcon {...commonOption} />
        </IconButton>
      </Tooltip>
    </RedditShareButton>
  )
}

const Linkedin: React.FC<{ url: string }> = ({ url }) => {
  return (
    <LinkedinShareButton
      url={url}
      title='Check My JSON Typed Definition | JTDV'
      summary='JSON Type Definition, aka RFC 8927, is an easy-to-learn, portable, and standardized way to describe the shape of your JSON data. cf. https://jsontypedef.com'
      source='JTDV'
    >
      <Tooltip title='LinkedIn'>
        <IconButton>
          <LinkedinIcon {...commonOption} />
        </IconButton>
      </Tooltip>
    </LinkedinShareButton>
  )
}

const Pocket: React.FC<{ url: string }> = ({ url }) => {
  return (
    <PocketShareButton url={url} title='Check My JSON Typed Definition | JTDV'>
      <Tooltip title='Pocket'>
        <IconButton>
          <PocketIcon {...commonOption} />
        </IconButton>
      </Tooltip>
    </PocketShareButton>
  )
}

const Hatena: React.FC<{ url: string }> = ({ url }) => {
  return (
    <HatenaShareButton url={url} title='Check My JSON Typed Definition | JTDV'>
      <Tooltip title='Pocket'>
        <IconButton>
          <HatenaIcon {...commonOption} />
        </IconButton>
      </Tooltip>
    </HatenaShareButton>
  )
}

const ShareButtons: React.FC<{ url: string }> = ({ url }) => {
  return (
    <>
      <Twitter url={url} />
      <LINE url={url} />
      <FaceBook url={url} />
      <Weibo url={url} />
      <Reddit url={url} />
      <Pocket url={url} />
      <Hatena url={url} />
      <Linkedin url={url} />
    </>
  )
}

export default ShareButtons
