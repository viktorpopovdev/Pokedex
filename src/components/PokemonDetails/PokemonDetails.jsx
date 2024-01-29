import { Card, Text, Badge, Group, Image, CloseButton } from '@mantine/core';
import { choseColorForBadge } from '../../utils/color';
import styles from './PokemonDetails.module.scss';

function PokemonDetails({ pokemonDetails, setIsOpen }) {
  return (
    pokemonDetails && (
      <>
        <Card
          classNames={{
            root: styles.card,
            section: styles.section,
          }}
          shadow="sm"
          padding="lg"
          radius="md"
          bg={'white'}
          withBorder
        >
          <Card.Section>
            <CloseButton classNames={{ root: styles.close }} onClick={() => setIsOpen(false)} variant="transparent" />
            <Image
              classNames={{ root: styles.img }}
              src={pokemonDetails.sprites.other['official-artwork'].front_default}
              alt={pokemonDetails.name}
            />
          </Card.Section>
          <Text classNames={{ root: styles.title }}>{pokemonDetails.name}</Text>
          <Group classNames={{ root: styles.types }}>
            {pokemonDetails.types.map((pokemonType) => {
              const colorBadge = choseColorForBadge(pokemonType.type.name);
              return (
                <Badge
                  color={colorBadge}
                  key={pokemonDetails.id + pokemonType.type.name}
                  classNames={{ root: styles.badge }}
                >
                  {pokemonType.type.name}
                </Badge>
              );
            })}
          </Group>
          <Group classNames={{ root: styles.stats }}>
            {pokemonDetails.stats.map((pokemonStat) => {
              return (
                <Text key={pokemonStat.stat.name} classNames={{ root: styles.info }}>
                  {pokemonStat.stat.name}: {pokemonStat.base_stat}
                </Text>
              );
            })}
            <Text classNames={{ root: styles.info }}>Weight: {pokemonDetails.weight}</Text>
          </Group>
        </Card>
      </>
    )
  );
}

export default PokemonDetails;
