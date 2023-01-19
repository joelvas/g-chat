const getRandomAvatar = (name: string): string => {
  return (
    `https://api.multiavatar.com/${name}.png`
  )
}

const getRandomAvatarLetters = (name: string): string => {
  return (
    'https://ui-avatars.com/api/?background=random&name=' + name.split(' ')[0]
  )
}

const getRandomImagePlaceholder = (name: string): string => {
  return (
    // 'https://ui-avatars.com/api/?background=random&name=' + name.split(' ')[0]
    `https://picsum.photos/seed/${name}/100/100`
  )
}

export { getRandomAvatar, getRandomImagePlaceholder, getRandomAvatarLetters }
